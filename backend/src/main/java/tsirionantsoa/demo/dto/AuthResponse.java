package tsirionantsoa.demo.dto;

import lombok.Data;

// DTO pour la réponse après connexion ou inscription réussie
@Data
public class AuthResponse {
    private String nom;
    private String email;
    // Cet ID (id) est ce que nous utiliserons côté client pour faire les requêtes de tâche.
}
