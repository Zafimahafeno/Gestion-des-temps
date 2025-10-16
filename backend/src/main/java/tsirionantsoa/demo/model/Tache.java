package tsirionantsoa.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "tache")
@Data
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_task")
    private Long id;

    @Column(name = "titre_task", nullable = false)
    private String titre;

    @Column(name = "priorite_task")
    private String priorite; // Peut être un Enum si vous voulez plus de contrôle

    @Column(name = "echeance_task")
    private LocalDateTime echeance;

    @Column(name = "status")
    private String status; // Nouveau champ

    @Column(name = "datecreation_task", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "datemodification_task")
    private LocalDateTime dateModification;

    // Relation Many-to-One: Une tâche appartient à un seul projet
    @ManyToOne
    @JoinColumn(name = "id_projet", nullable = false)
    private Projet projet;

    // Relation Many-to-One: Une tâche est assignée à un seul utilisateur
    @ManyToOne
    @JoinColumn(name = "id_users", nullable = false)
    private Utilisateur utilisateur;
}
