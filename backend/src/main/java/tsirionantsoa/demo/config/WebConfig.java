package tsirionantsoa.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration alternative pour les problèmes CORS en utilisant le WebMvcConfigurer.
 * Ce fichier est complémentaire au SecurityConfig.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Autorise TOUTES les requêtes API (/**)
        registry.addMapping("/**") 
                // Autorise explicitement l'origine de votre frontend
                .allowedOrigins("http://localhost:5173") 
                // Autorise toutes les méthodes HTTP (GET, POST, etc.)
                .allowedMethods("*") 
                // Autorise tous les headers
                .allowedHeaders("*") 
                // Permet l'envoi de credentials (nécessaire si vous utilisez des sessions ou des cookies)
                .allowCredentials(true); 
    }
}
