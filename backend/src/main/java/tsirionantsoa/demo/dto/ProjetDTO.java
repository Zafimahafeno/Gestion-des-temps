package tsirionantsoa.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data // Génère automatiquement les getters, setters, toString(), equals et hashCode
@NoArgsConstructor // Génère le constructeur sans argument (nécessaire pour la désérialisation JSON par Jackson)
@AllArgsConstructor // Génère le constructeur avec tous les arguments
public class ProjetDTO {
    
    private String nom;
    private String description;
    private String dateDebut;
    private String dateFin;
}