package tsirionantsoa.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tsirionantsoa.demo.model.Tache;
import tsirionantsoa.demo.service.TacheService;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/taches")
public class TacheController {
    @Autowired
    private TacheService tacheService;

    @PostMapping
    public ResponseEntity<Tache> createTache(
        @RequestBody Tache tache,
        @RequestParam Long projetId,
        @RequestParam Long userId) {
        try {
            Tache createdTache = tacheService.createTache(tache, projetId, userId);
            return ResponseEntity.ok(createdTache);
        } catch (RuntimeException e) {
            // Ici, une erreur indique que le projet ou l'utilisateur n'existe pas
            return ResponseEntity.badRequest().body(null);
         }
    }

    // GET /api/taches
    @GetMapping
    public List<Tache> getAllTaches() {
        return tacheService.findAllTaches();
    }

    // GET /api/taches/par-projet/1
    @GetMapping("/par-projet/{projetId}")
    public List<Tache> getTachesByProjetId(@PathVariable Long projetId) {
        return tacheService.findTachesByProjet(projetId);
    }

    // GET /api/taches/1
    @GetMapping("/{id}")
    public ResponseEntity<Tache> getTacheById(@PathVariable Long id) {
        return tacheService.findTacheById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/taches/1
    @PutMapping("/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable Long id, @RequestBody Tache tacheDetails) {
        try {
            Tache updatedTache = tacheService.updateTache(id, tacheDetails);
            return ResponseEntity.ok(updatedTache);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/taches/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable Long id) {
        try {
            tacheService.deleteTache(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
