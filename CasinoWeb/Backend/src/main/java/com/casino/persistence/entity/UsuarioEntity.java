package com.casino.persistence.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo", unique = true)
    private String correo;

    @Column(name = "contraseña")
    private String contraseña;

    @Column(name = "fondos")
    private BigDecimal fondos;

    @Column(name = "es_bot")
    private Boolean esBot = false;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    public UsuarioEntity() {
    }

    public UsuarioEntity(String nombre, String correo, String contraseña, BigDecimal fondos) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.fondos = fondos;
        this.esBot = false;
        this.fechaRegistro = LocalDateTime.now();
    }

    // Getters y Setters
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public BigDecimal getFondos() {
        return fondos;
    }

    public void setFondos(BigDecimal fondos) {
        this.fondos = fondos;
    }

    public Boolean getEsBot() {
        return esBot;
    }

    public void setEsBot(Boolean esBot) {
        this.esBot = esBot;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
