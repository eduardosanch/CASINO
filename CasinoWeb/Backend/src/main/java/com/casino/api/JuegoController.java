package com.casino.api;

import com.casino.api.dto.IniciarRequest;
import com.casino.api.dto.JugadaRequest;
import com.casino.persistence.entity.UsuarioEntity;
import com.casino.service.JuegoService;
import com.casino.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/juego")
@CrossOrigin(origins = "http://localhost:5173")
public class JuegoController {

    @Autowired
    private JuegoService juegoService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/iniciar")
    public ResponseEntity<?> iniciarJuego(@RequestBody IniciarRequest req) throws Exception {
        // Validar que el usuario existe en BD y obtener su saldo actual
        UsuarioEntity usuario = usuarioService.obtenerUsuario(req.getIdUsuario());
        
        // Validar que tenga fondos suficientes
        if (usuario.getFondos().compareTo(req.getApuesta()) < 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Fondos insuficientes para esta apuesta"));
        }
        
        // El juego comienza con el saldo actual del usuario
        Map<String, Object> estado = juegoService.iniciarJuego(
                req.getJugadorId(),
                req.getTipoJuego(),
                usuario.getFondos(),  // Usar saldo actual del usuario, no saldoInicial fijo
                req.getApuesta()
        );
        return ResponseEntity.ok(estado);
    }

    @PostMapping("/jugada")
    public ResponseEntity<?> ejecutarJugada(@RequestBody JugadaRequest req) throws Exception {
        Map<String, Object> estado = juegoService.ejecutarJugada(
                req.getJugadorId(),
                req.getTipoJuego(),
                req.getParametros()
        );
        return ResponseEntity.ok(estado);
    }

    @GetMapping("/estado")
    public ResponseEntity<?> obtenerEstado(
            @RequestParam String jugadorId,
            @RequestParam String tipoJuego) throws Exception {

        Map<String, Object> estado = juegoService.obtenerEstadoJuego(jugadorId, tipoJuego);
        return ResponseEntity.ok(estado);
    }

    @PostMapping("/finalizar")
    public ResponseEntity<?> finalizar(
            @RequestParam String jugadorId,
            @RequestParam String tipoJuego,
            @RequestParam(required = false) Double ganancia) {
        try {
            juegoService.finalizarJuego(jugadorId, tipoJuego);
            
            // Si hay ganancia (incluyendo 0 o negativa), actualizarla
            if (ganancia != null) {
                Integer usuarioId = extractUsuarioIdFromJugadorId(jugadorId);
                usuarioService.agregarGanancia(usuarioId, new java.math.BigDecimal(ganancia));
            }
            
            return ResponseEntity.ok(Map.of("status", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private Integer extractUsuarioIdFromJugadorId(String jugadorId) {
        // El jugadorId puede venir como "PLAYER123" o como un número de usuario
        try {
            return Integer.parseInt(jugadorId);
        } catch (NumberFormatException e) {
            // Si no es un número, retornar 1 como default
            return 1;
        }
    }
}
