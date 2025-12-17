package com.casino.persistence.repository;

import com.casino.persistence.entity.PartidaJugadorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PartidaJugadorRepository extends JpaRepository<PartidaJugadorEntity, Integer> {
    List<PartidaJugadorEntity> findByPartidaIdPartida(Integer idPartida);
    List<PartidaJugadorEntity> findByUsuarioIdUsuario(Integer idUsuario);
}
