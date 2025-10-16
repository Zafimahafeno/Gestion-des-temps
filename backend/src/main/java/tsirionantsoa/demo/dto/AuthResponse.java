package tsirionantsoa.demo.dto;

import lombok.Data;

// DTO pour la réponse après connexion ou inscription réussie
@Data
public class AuthResponse {
    private Long id;
    private String nom;
    private String email;
    private String message;
    // Cet ID (id) est ce que nous utiliserons côté client pour faire les requêtes de tâche.
}
