package com.casino.persistence.repository;

import com.casino.persistence.entity.JuegoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface JuegoRepository extends JpaRepository<JuegoEntity, Integer> {
    Optional<JuegoEntity> findByNombre(String nombre);
    Optional<JuegoEntity> findByTipo(String tipo);
}
