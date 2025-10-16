package tsirionantsoa.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "utilisateur") // Spécifie le nom exact de la table
@Data
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "email", nullable = false, unique = true) // L'email doit être unique
    private String email;

    @Column(name = "mot_de_passe", nullable = false)
    @JsonIgnore // Ne jamais sérialiser le mot de passe
    @ToString.Exclude // Ne jamais l'inclure dans les logs Lombok
    private String motDePasse;

    @Column(name = "date_creation", nullable = false)
    private LocalDate dateCreation; 

    @Column(name = "role", nullable = false)
    private String role; 

    // Relation inverse One-to-Many avec l'entité Projet
    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Évite les boucles de sérialisation infinies
    @ToString.Exclude
    private List<Projet> projets;
}