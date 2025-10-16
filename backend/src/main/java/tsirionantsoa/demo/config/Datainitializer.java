package tsirionantsoa.demo.config;

import tsirionantsoa.demo.model.Utilisateur;
import tsirionantsoa.demo.repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class Datainitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;

    public Datainitializer(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Nous vérifions si un utilisateur avec l'email "admin@projet.com" existe, 
        // car l'ID auto-incrémenté 1 n'est pas toujours garanti.
        if (utilisateurRepository.findByEmail("admin@projet.com").isEmpty()) { // NÉCESSITE UNE MÉTHODE DANS LE REPOSITORY
            
            System.out.println("----------------------------------------");
            System.out.println("INITIALISATION : Création du compte ADMINISTRATEUR par défaut.");
            
            Utilisateur admin = new Utilisateur();
            admin.setNom("Admin Principal");
            admin.setEmail("admin@projet.com");
            admin.setMotDePasse("1234"); 
            
            // ⭐ Mise à jour : Initialisation des nouveaux champs
            admin.setDateCreation(LocalDate.now()); 
            admin.setRole("ADMIN"); // Définition du rôle
            
            utilisateurRepository.save(admin);
            
            System.out.println("Administrateur (ADMIN) créé avec succès. ID (attribué par la DB): " + admin.getId());
            System.out.println("----------------------------------------");
        } else {
             System.out.println("----------------------------------------");
             System.out.println("INFO : Le compte Administrateur par défaut (admin@projet.com) existe déjà. Initialisation ignorée.");
             System.out.println("----------------------------------------");
        }
    }
}