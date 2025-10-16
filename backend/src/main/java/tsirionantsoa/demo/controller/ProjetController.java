package tsirionantsoa.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tsirionantsoa.demo.dto.ProjetDTO;
import tsirionantsoa.demo.model.Projet;
import tsirionantsoa.demo.service.ProjetService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/projets")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    // POST /api/projets?userId=1
    @PostMapping
    public ResponseEntity<?> createProjet(
        @RequestBody ProjetDTO projetDTO,
        @RequestParam Long userId) {
        try {
            System.out.println("=== CONTROLLER DEBUG ===");
            System.out.println("DTO reçu: " + projetDTO);

            Projet createdProjet = projetService.createProjet(projetDTO, userId);
            return ResponseEntity.ok(createdProjet);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /api/projets?page=0&size=10&sortBy=id
    // Cette méthode a été mise à jour pour utiliser la pagination (Page<Projet>)
    @GetMapping
    public ResponseEntity<Page<Projet>> getAllProjets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy) {
        try {
            Page<Projet> projets = projetService.findAllProjets(page, size, sortBy);
            return ResponseEntity.ok(projets);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // GET /api/projets/1
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjetById(@PathVariable Long id) {
        try {
            return projetService.findProjetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/projets/1
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProjet(@PathVariable Long id, @RequestBody ProjetDTO projetDTO) {
        try {
            System.out.println("=== UPDATE CONTROLLER DEBUG ===");
            System.out.println("DTO reçu: " + projetDTO);

            Projet updatedProjet = projetService.updateProjet(id, projetDTO);
            return ResponseEntity.ok(updatedProjet);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE /api/projets/1
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProjet(@PathVariable Long id) {
        try {
            projetService.deleteProjet(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}