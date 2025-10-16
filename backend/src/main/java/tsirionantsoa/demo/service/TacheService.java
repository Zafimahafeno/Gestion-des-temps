package tsirionantsoa.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tsirionantsoa.demo.model.Projet;
import tsirionantsoa.demo.model.Tache;
import tsirionantsoa.demo.model.Utilisateur;
import tsirionantsoa.demo.repository.ProjetRepository;
import tsirionantsoa.demo.repository.TacheRepository;
import tsirionantsoa.demo.repository.UtilisateurRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TacheService {

    @Autowired
    private TacheRepository tacheRepository;

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // CREATE (Créer une nouvelle tâche dans un projet et l'assigner à un utilisateur)
    public Tache createTache(Tache tache, Long projetId, Long userId) {
        // Vérification du Projet
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isEmpty()) {
            throw new RuntimeException("Projet non trouvé avec l'ID: " + projetId);
        }
        // Vérification de l'Utilisateur
        Optional<Utilisateur> userOpt = utilisateurRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID: " + userId);
        }

        tache.setProjet(projetOpt.get());
        tache.setUtilisateur(userOpt.get());
        tache.setDateCreation(LocalDateTime.now());
        // Initialiser la date de modification à la date de création
        tache.setDateModification(LocalDateTime.now());
        
        return tacheRepository.save(tache);
    }

    // READ (Trouver toutes les tâches)
    public List<Tache> findAllTaches() {
        return tacheRepository.findAll();
    }

    // READ (Trouver une tâche par ID)
    public Optional<Tache> findTacheById(Long id) {
        return tacheRepository.findById(id);
    }

    // READ (Trouver les tâches par Projet ID)
    public List<Tache> findTachesByProjet(Long projetId) {
        return tacheRepository.findByProjetId(projetId);
    }

    // UPDATE (Mettre à jour une tâche)
    public Tache updateTache(Long id, Tache tacheDetails) {
        return tacheRepository.findById(id)
            .map(tache -> {
                tache.setTitre(tacheDetails.getTitre());
                tache.setPriorite(tacheDetails.getPriorite());
                tache.setEcheance(tacheDetails.getEcheance());
                tache.setDateModification(LocalDateTime.now());
                
                // Si vous voulez changer le projet ou l'utilisateur assigné, 
                // vous devez gérer la recherche et l'assignation ici.
                
                return tacheRepository.save(tache);
            })
            .orElseThrow(() -> new RuntimeException("Tâche non trouvée avec l'ID: " + id));
    }

    // DELETE (Supprimer une tâche)
    public void deleteTache(Long id) {
        if (!tacheRepository.existsById(id)) {
            throw new RuntimeException("Tâche non trouvée avec l'ID: " + id);
        }
        tacheRepository.deleteById(id);
    }
}