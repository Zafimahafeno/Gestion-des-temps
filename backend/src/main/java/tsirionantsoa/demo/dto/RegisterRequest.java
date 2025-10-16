package tsirionantsoa.demo.dto;

import lombok.Data;

/**
 * Data Transfer Object (DTO) utilisé pour recevoir les données
 * du formulaire d'inscription (JSON) depuis le frontend.
 * Ce DTO garantit que le champ 'motDePasse' est bien lu par Jackson.
 */
@Data // Utilise Lombok pour générer les Getters, Setters, etc.
public class RegisterRequest {
    
    private String nom;
    
    private String email;
    
    // Le nom du champ doit correspondre EXACTEMENT au payload JSON du frontend
    private String motDePasse; 
}
