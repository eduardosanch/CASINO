package com.casino.service;

import com.casino.persistence.entity.UsuarioEntity;
import com.casino.persistence.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Encriptar contraseña
     */
    public String encriptarContraseña(String contraseña) {
        return passwordEncoder.encode(contraseña);
    }

    /**
     * Verificar contraseña (soporta tanto BCrypt como texto plano para pruebas)
     */
    public boolean verificarContraseña(String contraseñaIngresada, String contraseñaGuardada) {
        if (contraseñaGuardada == null || contraseñaIngresada == null) {
            return false;
        }
        
        // Si la contraseña guardada empieza con "$2a$" o "$2b$", es BCrypt
        if (contraseñaGuardada.startsWith("$2a$") || contraseñaGuardada.startsWith("$2b$")) {
            return passwordEncoder.matches(contraseñaIngresada, contraseñaGuardada);
        }
        
        // Si no, es texto plano (para compatibilidad con datos de prueba)
        return contraseñaIngresada.equals(contraseñaGuardada);
    }

    /**
     * Obtener usuario por ID
     */
    public UsuarioEntity obtenerUsuario(Integer idUsuario) throws Exception {
        return usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new Exception("Usuario no encontrado"));
    }

    /**
     * Obtener usuario por correo
     */
    public UsuarioEntity obtenerPorCorreo(String correo) throws Exception {
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new Exception("Usuario no encontrado"));
    }

    /**
     * Crear nuevo usuario
     */
    public UsuarioEntity crearUsuario(String nombre, String correo, String contraseña, BigDecimal fondos) throws Exception {
        // Validar que no exista usuario con ese correo
        if (usuarioRepository.findByCorreo(correo).isPresent()) {
            throw new Exception("El correo ya está registrado");
        }

        UsuarioEntity usuario = new UsuarioEntity(nombre, correo, encriptarContraseña(contraseña), fondos);
        return usuarioRepository.save(usuario);
    }

    /**
     * Actualizar fondos del usuario
     */
    public void actualizarFondos(Integer idUsuario, BigDecimal nuevosFondos) throws Exception {
        UsuarioEntity usuario = obtenerUsuario(idUsuario);
        usuario.setFondos(nuevosFondos);
        usuarioRepository.save(usuario);
    }

    /**
     * Restar apuesta del saldo
     */
    public void restarApuesta(Integer idUsuario, BigDecimal apuesta) throws Exception {
        UsuarioEntity usuario = obtenerUsuario(idUsuario);
        
        if (usuario.getFondos().compareTo(apuesta) < 0) {
            throw new Exception("Fondos insuficientes para la apuesta");
        }
        
        usuario.setFondos(usuario.getFondos().subtract(apuesta));
        usuarioRepository.save(usuario);
    }

    /**
     * Agregar ganancias al saldo
     */
    public void agregarGanancia(Integer idUsuario, BigDecimal ganancia) throws Exception {
        UsuarioEntity usuario = obtenerUsuario(idUsuario);
        usuario.setFondos(usuario.getFondos().add(ganancia));
        usuarioRepository.save(usuario);
    }

    /**
     * Mapear entidad a Map para respuesta
     */
    public Map<String, Object> mapearUsuario(UsuarioEntity usuario) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("idUsuario", usuario.getIdUsuario());
        respuesta.put("nombre", usuario.getNombre());
        respuesta.put("correo", usuario.getCorreo());
        respuesta.put("fondos", usuario.getFondos());
        respuesta.put("esBot", usuario.getEsBot());
        respuesta.put("fechaRegistro", usuario.getFechaRegistro());
        return respuesta;
    }
}
