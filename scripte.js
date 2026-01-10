




/**
 * BinaaCompare - Logiciel de comparaison de matériaux
 * Structure Professionnelle
 */

// 1. Simulation de la Base de Données (Provenant normalement d'une API)
const BDD_MATERIAUX = [
    { id: 1, nom: "Ciment CPJ 45", categorie: "Ciment", prix: 74, unite: "Sac 50kg", ville: "Casablanca", fournisseur: "Lafarge", stock: true },
    { id: 2, nom: "Acier Haute Adhérence 12mm", categorie: "Acier", prix: 11.80, unite: "kg", ville: "Tanger", fournisseur: "Maghreb Steel", stock: true },
    { id: 3, nom: "Brique 8 trous (Rouge)", categorie: "Briques", prix: 2.15, unite: "Unité", ville: "Marrakech", fournisseur: "Briqueterie Sud", stock: true },
    { id: 4, nom: "Béton Prêt à l'Emploi B25", categorie: "Béton", prix: 850, unite: "m³", ville: "Casablanca", fournisseur: "Ciments du Maroc", stock: true },
    { id: 5, nom: "Ciment CPJ 35", categorie: "Ciment", prix: 68, unite: "Sac 50kg", ville: "Agadir", fournisseur: "Holcim", stock: false },
    { id: 6, nom: "Carrelage 60x60 Grès", categorie: "Finition", prix: 145, unite: "m²", ville: "Rabat", fournisseur: "Comptoir Marocain", stock: true }
];

// 2. Sélection des éléments du DOM
const searchInput = document.querySelector('.search-box input[type="text"]:first-child');
const cityInput = document.querySelector('.search-box input[placeholder*="Ville"]');
const searchBtn = document.querySelector('.btn-search');
const mainContainer = document.querySelector('.grid-container');

// 3. Fonction pour générer le HTML d'une carte produit
const creerCarteProduit = (item) => {
    return `
        <div class="category-card product-item" data-id="${item.id}">
            <div class="badge ${item.stock ? 'badge-in' : 'badge-out'}">
                ${item.stock ? 'En stock' : 'Rupture'}
            </div>
            <i class="fa-solid fa-box-open icon"></i>
            <h3>${item.nom}</h3>
            <p class="provider"><strong>Fournisseur:</strong> ${item.fournisseur}</p>
            <p class="location"><i class="fa-solid fa-location-dot"></i> ${item.ville}</p>
            <div class="price-tag">
                <span class="amount">${item.prix}</span> 
                <span class="currency">DH / ${item.unite}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Comparer les offres</button>
        </div>
    `;
};

// 4. Logique de Filtrage
const filtrerMateriaux = () => {
    const query = searchInput.value.toLowerCase();
    const cityQuery = cityInput.value.toLowerCase();

    const resultats = BDD_MATERIAUX.filter(item => {
        const correspondNom = item.nom.toLowerCase().includes(query) || item.categorie.toLowerCase().includes(query);
        const correspondVille = item.ville.toLowerCase().includes(cityQuery);
        return correspondNom && correspondVille;
    });

    afficherResultats(resultats);
};

// 5. Affichage des résultats
const afficherResultats = (liste) => {
    if (liste.length === 0) {
        mainContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: #ccc;"></i>
                <p style="margin-top: 15px;">Aucun matériau trouvé pour votre recherche.</p>
            </div>
        `;
        return;
    }
    mainContainer.innerHTML = liste.map(item => creerCarteProduit(item)).join('');
};

// 6. Événements (Ecouteurs)
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    filtrerMateriaux();
    // Scroll fluide vers les résultats
    mainContainer.scrollIntoView({ behavior: 'smooth' });
});

// Recherche en temps réel pendant la saisie
searchInput.addEventListener('keyup', filtrerMateriaux);
cityInput.addEventListener('keyup', filtrerMateriaux);

// Affichage initial
window.addEventListener('DOMContentLoaded', () => {
    afficherResultats(BDD_MATERIAUX);
});
// Dans votre script.js actuel, modifiez la ligne du bouton :
<button class="btn btn-primary" onclick="window.location.href='catalogue.html?cat=${item.categorie}'">
    Comparer les offres
</button>


lmowridin


/**
 * BinaaCompare - Script Global Annuaire
 * Gère le filtrage par ville et la recherche par texte
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection des éléments
    const searchInput = document.getElementById('searchInput');
    const pills = document.querySelectorAll('.pill');
    const cards = document.querySelectorAll('.supplier-pro-card');

    /**
     * Fonction Maîtresse de Filtrage
     * Cette fonction vérifie à la fois la ville active et le texte saisi
     */
    function applyFilters() {
        const searchText = searchInput.value.toLowerCase().trim();
        const activeCity = document.querySelector('.pill.active').textContent.trim();

        cards.forEach(card => {
            // Extraction des données de la carte
            const name = card.querySelector('h3').textContent.toLowerCase();
            const expertise = card.querySelector('.expert-tag').textContent.toLowerCase();
            const city = card.querySelector('.city-label').textContent.trim();

            // Logique de correspondance
            const matchesSearch = name.includes(searchText) || expertise.includes(searchText);
            const matchesCity = (activeCity === "Tous" || city === activeCity);

            // Application du résultat visuel
            if (matchesSearch && matchesCity) {
                card.style.display = "flex";
                // Petite animation d'apparition
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 10);
            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(10px)";
                card.style.display = "none";
            }
        });
    }

    // 2. Événement : Saisie dans la barre de recherche
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }

    // 3. Événement : Clic sur une ville (Pills)
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Mise à jour visuelle des boutons
            pills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            // Lancer le filtrage
            applyFilters();
        });
    });

    // 4. Diagnostic Console (Pour vérifier que tout est chargé)
    console.log("Système de filtrage BinaaCompare : Prêt");
    console.log("Nombre de fournisseurs détectés :", cards.length);
});
document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.getElementById('btnSearch');
    const productInput = document.getElementById('productSearch');
    const cityInput = document.getElementById('citySearch');
    const cards = document.querySelectorAll('.supplier-pro-card');

    function performSearch() {
        const productValue = productInput.value.toLowerCase().trim();
        const cityValue = cityInput.value.toLowerCase().trim();

        cards.forEach(card => {
            // On récupère les textes de la carte
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardExpertise = card.querySelector('.expert-tag').textContent.toLowerCase();
            const cardCity = card.querySelector('.city-label').textContent.toLowerCase();

            // Vérification Produit (dans le titre ou le tag expertise)
            const matchProduct = productValue === "" || 
                                 cardTitle.includes(productValue) || 
                                 cardExpertise.includes(productValue);

            // Vérification Ville
            const matchCity = cityValue === "" || 
                              cardCity.includes(cityValue);

            // Affichage SI les deux conditions sont vraies
            if (matchProduct && matchCity) {
                card.style.display = "flex";
                card.style.opacity = "1";
            } else {
                card.style.display = "none";
                card.style.opacity = "0";
            }
        });
    }

    // Lancer la recherche au clic
    btnSearch.addEventListener('click', performSearch);

    // Optionnel : Lancer la recherche quand on appuie sur "Entrée"
    [productInput, cityInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.btn-search');
    const productInput = document.querySelector('.search-box input[placeholder*="Que cherchez-vous"]');
    const cityInput = document.querySelector('.search-box input[placeholder*="Ville"]');
    const productCards = document.querySelectorAll('.material-card');

    // Définition des mots-clés pour la redirection intelligente
    const routes = {
        'ciment': 'gros-oeuvre.html',
        'beton': 'gros-oeuvre.html',
        'acier': 'acier-structure.html',
        'fer': 'acier-structure.html',
        'plaque': 'second-oeuvre.html',
        'isolation': 'second-oeuvre.html',
        'peinture': 'second-oeuvre.html',
        'carrelage': 'revetements.html',
        'tuyau': 'fluides-reseaux.html',
        'elec': 'fluides-reseaux.html'
    };

    function executeSearch() {
        const query = productInput.value.toLowerCase().trim();
        const city = cityInput.value.toLowerCase().trim();

        // 1. Logique de Redirection (si on est sur l'accueil)
        if (productCards.length === 0) {
            let targetPage = 'catalogue-global.html'; // Page par défaut
            
            for (let key in routes) {
                if (query.includes(key)) {
                    targetPage = routes[key];
                    break;
                }
            }
            
            // Stockage de la recherche pour la page suivante
            localStorage.setItem('binaaSearchQuery', query);
            localStorage.setItem('binaaSearchCity', city);
            
            window.location.href = targetPage;
            return;
        }

        // 2. Logique de Filtrage (si on est déjà sur une page matériaux.html)
        let foundAny = false;
        productCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const desc = card.querySelector('p').innerText.toLowerCase();
            const cities = card.getAttribute('data-cities') || "";

            const matchText = title.includes(query) || desc.includes(query);
            const matchCity = city === "" || cities.toLowerCase().includes(city);

            if (matchText && matchCity) {
                card.style.display = 'flex';
                foundAny = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Gestion du message "Aucun résultat"
        const noResultMsg = document.getElementById('noResult');
        if (noResultMsg) {
            noResultMsg.style.display = foundAny ? 'none' : 'block';
        }
    }

    // Événements
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        executeSearch();
    });

    productInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
    });

    // Récupération automatique de la recherche après redirection
    const savedQuery = localStorage.getItem('binaaSearchQuery');
    const savedCity = localStorage.getItem('binaaSearchCity');
    
    if (savedQuery && productCards.length > 0) {
        productInput.value = savedQuery;
        cityInput.value = savedCity;
        executeSearch();
        // Nettoyer après usage
        localStorage.removeItem('binaaSearchQuery');
        localStorage.removeItem('binaaSearchCity');
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobileBtn');
  const closeBtn = document.getElementById('closeBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('overlay');

  function toggleMenu() {
    const isActive = drawer.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
    drawer.style.transform = isActive ? 'translateX(0)' : 'translateX(100%)';
  }

  mobileBtn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
});
function moteurDeRecherche() {
    // On récupère ce que l'utilisateur a tapé
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const city = document.getElementById('cityInput').value.toLowerCase().trim();

    // Dictionnaire de correspondance (Mots-clés -> Pages)
    const catalogue = {
        "acier": "acier.html",
        "fer": "acier.html",
        "rond": "acier.html",
        "isolation": "isola.html",
        "laine": "isola.html",
        "etancheite": "isola.html",
        "finition": "finition.html",
        "peinture": "finition.html",
        "carrelage": "finition.html",
        "gros": "grose_over.html",
        "ciment": "grose_over.html",
        "brique": "grose_over.html",
        "beton": "grose_over.html"
    };

    // On cherche si un mot-clé correspond
    let pageTrouvee = "";
    
    for (let motCle in catalogue) {
        if (query.includes(motCle)) {
            pageTrouvee = catalogue[motCle];
            break;
        }
    }

    if (pageTrouvee !== "") {
        // Redirection vers la page avec les paramètres de recherche
        // Exemple: acier.html?search=acier&city=casablanca
        window.location.href = `${pageTrouvee}?search=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`;
    } else {
        alert("Désolé, nous n'avons pas trouvé de résultats pour '" + query + "'. Essayez: Acier, Ciment ou Isolation.");
    }
}

// Permettre de valider en appuyant sur la touche "Entrée"
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        moteurDeRecherche();
    }
});

// À mettre dans acier.html
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        console.log("L'utilisateur cherche : " + searchQuery);
        // Ici, vous pouvez ajouter un code pour cacher les produits 
        // qui ne contiennent pas le mot 'searchQuery'
    }
};


npm install @google/genai
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();