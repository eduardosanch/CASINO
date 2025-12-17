package com.casino.api;

import com.casino.api.dto.LoginRequest;
import com.casino.api.dto.RegistroRequest;
import com.casino.persistence.entity.UsuarioEntity;
import com.casino.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody RegistroRequest req) {
        try {
            UsuarioEntity usuario = usuarioService.crearUsuario(
                    req.getNombre(),
                    req.getCorreo(),
                    req.getContraseña(),
                    new BigDecimal("1000.00")
            );
            return ResponseEntity.ok(usuarioService.mapearUsuario(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            UsuarioEntity usuario = usuarioService.obtenerPorCorreo(req.getCorreo());
            
            // Verificar contraseña
            if (!usuarioService.verificarContraseña(req.getContraseña(), usuario.getContraseña())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Contraseña incorrecta"));
            }
            
            return ResponseEntity.ok(usuarioService.mapearUsuario(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable Integer id) {
        try {
            UsuarioEntity usuario = usuarioService.obtenerUsuario(id);
            return ResponseEntity.ok(usuarioService.mapearUsuario(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/usuario/{id}/actualizar-saldo")
    public ResponseEntity<?> actualizarSaldo(@PathVariable Integer id, @RequestBody Map<String, Object> req) {
        try {
            BigDecimal nuevoSaldo = new BigDecimal(req.get("saldo").toString());
            usuarioService.actualizarFondos(id, nuevoSaldo);
            UsuarioEntity usuario = usuarioService.obtenerUsuario(id);
            return ResponseEntity.ok(usuarioService.mapearUsuario(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
