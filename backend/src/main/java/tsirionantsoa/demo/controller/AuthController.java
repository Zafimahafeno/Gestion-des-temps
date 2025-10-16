package tsirionantsoa.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tsirionantsoa.demo.model.Utilisateur;
import tsirionantsoa.demo.repository.UtilisateurRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Utilisateur utilisateur) {
        try {

            //System.out.println("Data Utilisateur => " + utilisateur);

            Utilisateur newUser = utilisateurService.registerUtilisateur(utilisateur);
            
            AuthResponse response = new AuthResponse();
            response.setId(newUser.getId());
            response.setNom(newUser.getNom());
            response.setEmail(newUser.getEmail());
            response.setMot_de_passe(newUser.getMotDePasse());
            response.setMessage("Inscription réussie. Bienvenue !");
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Email déjà utilisé
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // LOGIN (Vérifier les identifiants)
    public Optional<Utilisateur> loginUtilisateur(String email, String rawPassword) {
        Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            Utilisateur utilisateur = userOpt.get();
            // Comparer le mot de passe brut avec le mot de passe haché
            if (passwordEncoder.matches(rawPassword, utilisateur.getMotDePasse())) {
                return Optional.of(utilisateur);
            }
        }
        return Optional.empty(); // Échec de la connexion
    }
    
    // READ (Trouver tous les utilisateurs)
    public List<Utilisateur> findAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // READ (Trouver un utilisateur par ID)
    public Optional<Utilisateur> findUtilisateurById(Long id) {
        return utilisateurRepository.findById(id);
    }

    // UPDATE (Mettre à jour un utilisateur existant)
    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateurDetails) {
        return utilisateurRepository.findById(id)
            .map(utilisateur -> {
                if (utilisateurDetails.getNom() != null) {
                    utilisateur.setNom(utilisateurDetails.getNom());
                }
                if (utilisateurDetails.getEmail() != null) {
                    // Vérification de l'unicité de l'email à ajouter si changement
                    utilisateur.setEmail(utilisateurDetails.getEmail());
                }
                // Si le mot de passe est fourni, le hacher avant de le sauvegarder
                if (utilisateurDetails.getMotDePasse() != null && !utilisateurDetails.getMotDePasse().isEmpty()) {
                    String hashedPassword = passwordEncoder.encode(utilisateurDetails.getMotDePasse());
                    utilisateur.setMotDePasse(hashedPassword);
                }
                return utilisateurRepository.save(utilisateur);
            })
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID: " + id));
    }

    // DELETE (Supprimer un utilisateur)
    public void deleteUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID: " + id);
        }
        utilisateurRepository.deleteById(id);
    }
}
