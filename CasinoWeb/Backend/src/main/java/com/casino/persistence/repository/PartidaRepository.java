package com.casino.persistence.repository;

import com.casino.persistence.entity.PartidaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PartidaRepository extends JpaRepository<PartidaEntity, Integer> {
    List<PartidaEntity> findByJuegoIdJuego(Integer idJuego);
}
