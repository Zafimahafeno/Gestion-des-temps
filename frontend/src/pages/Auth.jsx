import React, { useState } from "react";
import { LogIn, UserPlus, X, AlertTriangle } from "lucide-react";

// Configuration de base de l'API (à adapter si le port change)
const API_BASE_URL = "http://localhost:8080/api/auth";

// Composant de message d'alerte (remplace alert() et window.alert())
const AlertMessage = ({ message, type, onClose }) => {
    const color = type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700";
    const icon = type === "success" ? <LogIn size={20} /> : <AlertTriangle size={20} />;

    if (!message) return null;

    return (
        <div className={`flex items-center justify-between p-4 border rounded-lg mb-4 shadow-md ${color}`} role="alert">
            <div className="flex items-center">
                {icon}
                <span className="ml-3 font-medium">{message}</span>
            </div>
            {onClose && (
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition">
                    <X size={20} />
                </button>
            )}
        </div>
    );
};

// Composant principal d'authentification (gère Login et Register)
const Auth = () => {
    // État pour basculer entre 'login' et 'register'
    const [view, setView] = useState("login"); 
    
    const [form, setForm] = useState({
        name: "", // Pour l'inscription
        email: "",
        motDePasse: "", // IMPORTANT : nom de champ du modèle Spring Boot
        confirmPassword: "", // Seulement pour l'inscription
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: null, type: null });

    // Fonction pour vider l'alerte
    const clearAlert = () => setAlert({ message: null, type: null });

    // Mise à jour du formulaire
    const handleChange = (e) => {
        clearAlert();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Fonction de soumission (Login ou Register)
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAlert();
        setLoading(true);

        const isRegister = view === "register";

        // Validation front-end du mot de passe (Inscription)
        if (isRegister && form.motDePasse !== form.confirmPassword) {
            setAlert({ message: "Les mots de passe ne correspondent pas.", type: "error" });
            setLoading(false);
            return;
        }

        const endpoint = isRegister ? `${API_BASE_URL}/register` : `${API_BASE_URL}/login`;
        
        // Construction du corps de la requête
        const bodyData = isRegister ? {
            nom: form.name,
            email: form.email,
            motDePasse: form.motDePasse,
        } : {
            email: form.email,
            motDePasse: form.motDePasse,
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            // Gérer la réponse en texte si elle n'est pas OK (e.g. erreur 400 ou 401)
            const data = await response.json().catch(() => ({})); 
            
            if (response.ok) {
                // Succès : Stocker l'utilisateur dans localStorage
                localStorage.setItem("user", JSON.stringify(data));
                
                setAlert({ 
                    message: data.message || "Opération réussie. Redirection en cours...", 
                    type: "success" 
                });
                
                // Redirection simulée après 1.5s
                setTimeout(() => {
                    window.location.href = "/"; // Recharger l'application principale
                }, 1500);

            } else {
                // Échec de l'API (400, 401, 500...)
                const errorMessage = data.message || (isRegister ? "Erreur lors de l'inscription. L'email est peut-être déjà utilisé." : "Identifiants invalides.");
                setAlert({ message: errorMessage, type: "error" });
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
            setAlert({ message: "Erreur de connexion au serveur. Vérifiez que le backend est démarré (port 8080).", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Style de la carte d'authentification
    const AuthCard = (
        <div className="w-full max-w-sm bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition duration-300 transform hover:shadow-3xl border border-gray-100">
            <div className="text-center mb-6">
                {view === "login" ? (
                    <LogIn size={40} className="text-indigo-600 mx-auto p-1 bg-indigo-100 rounded-full" />
                ) : (
                    <UserPlus size={40} className="text-blue-600 mx-auto p-1 bg-blue-100 rounded-full" />
                )}
                <h2 className="font-extrabold text-3xl mt-3 text-gray-800">
                    {view === "login" ? "Connexion" : "Créer un compte"}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    {view === "login" ? "Accédez à votre espace" : "Rejoignez la plateforme"}
                </p>
            </div>

            <AlertMessage message={alert.message} type={alert.type} onClose={clearAlert} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {view === "register" && (
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                        placeholder="Nom complet"
                        value={form.name}
                        onChange={handleChange}
                        required={view === "register"}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                    placeholder="Adresse email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="motDePasse"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                    placeholder="Mot de passe"
                    value={form.motDePasse}
                    onChange={handleChange}
                    required
                />
                {view === "register" && (
                    <input
                        type="password"
                        name="confirmPassword"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                        placeholder="Confirmer le mot de passe"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                )}

                <button 
                    type="submit" 
                    className={`w-full py-3 mt-2 font-semibold rounded-lg text-white transition duration-200 shadow-md ${
                        loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : (view === "login" ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50')
                    }`}
                    disabled={loading}
                >
                    {loading ? "Chargement..." : (view === "login" ? "Se connecter" : "S'inscrire")}
                </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500">
                {view === "login" ? (
                    <>
                        Pas encore inscrit ?{" "}
                        <a href="#" onClick={() => setView("register")} className="font-medium text-indigo-600 hover:text-indigo-800 transition">
                            Créer un compte
                        </a>
                    </>
                ) : (
                    <>
                        Déjà un compte ?{" "}
                        <a href="#" onClick={() => setView("login")} className="font-medium text-blue-600 hover:text-blue-800 transition">
                            Se connecter
                        </a>
                    </>
                )}
            </p>
        </div>
    );

    return (
        <div 
            className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {AuthCard}
        </div>
    );
};

export default Auth;
