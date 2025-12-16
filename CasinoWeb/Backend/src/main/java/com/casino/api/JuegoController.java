package com.casino.api;

import com.casino.api.dto.IniciarRequest;
import com.casino.api.dto.JugadaRequest;
import com.casino.service.JuegoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/juego")
public class JuegoController {

    private final JuegoService juegoService;

    public JuegoController(JuegoService juegoService) {
        this.juegoService = juegoService;
    }

    @PostMapping("/iniciar")
    public ResponseEntity<?> iniciarJuego(@RequestBody IniciarRequest req) throws Exception {
        Map<String, Object> estado = juegoService.iniciarJuego(
                req.getJugadorId(),
                req.getTipoJuego(),
                req.getSaldoInicial()
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
    public ResponseEntity<?> finalizar(@RequestParam String jugadorId, @RequestParam String tipoJuego) {
        juegoService.finalizarJuego(jugadorId, tipoJuego);
        return ResponseEntity.ok(Map.of("status", "OK"));
    }
}
