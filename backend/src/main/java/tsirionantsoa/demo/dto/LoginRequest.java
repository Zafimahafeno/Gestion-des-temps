package tsirionantsoa.demo.dto;

import lombok.Data;

// DTO pour la requête de connexion
@Data
public class LoginRequest {
    private String email;
    private String motDePasse;
}
