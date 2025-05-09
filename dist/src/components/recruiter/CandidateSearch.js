var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../stores/auth';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, StarIcon, MapPinIcon, BriefcaseIcon, AcademicCapIcon, BookmarkIcon, } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { CandidateDetailModal } from './CandidateDetailModal';
function CandidateSearch() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [experienceMin, setExperienceMin] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const skillsList = [
        'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
        'UI/UX Design', 'Graphic Design', 'Content Writing', 'SEO',
        'Marketing', 'Data Analysis', 'Project Management'
    ];
    useEffect(() => {
        loadCandidates();
    }, [search, selectedSkills, experienceMin, location, availability]);
    const loadCandidates = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            // Simuler un appel API pour récupérer les candidats
            // Dans une vraie application, cela serait remplacé par un appel à Supabase
            const mockCandidates = [
                {
                    id: 'cand1',
                    full_name: 'Sophie Martin',
                    title: 'Développeuse Full Stack',
                    location: 'Paris',
                    avatar_url: 'https://randomuser.me/api/portraits/women/1.jpg',
                    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
                    experience: 5,
                    education: 'Master en Informatique',
                    match_score: 92,
                    availability: 'available'
                },
                {
                    id: 'cand2',
                    full_name: 'Thomas Dubois',
                    title: 'Product Manager',
                    location: 'Lyon',
                    avatar_url: 'https://randomuser.me/api/portraits/men/2.jpg',
                    skills: ['Product Management', 'Agile', 'UX Research', 'Marketing'],
                    experience: 7,
                    education: 'MBA',
                    match_score: 85,
                    availability: 'limited'
                },
                {
                    id: 'cand3',
                    full_name: 'Julie Moreau',
                    title: 'UX Designer',
                    location: 'Bordeaux',
                    avatar_url: 'https://randomuser.me/api/portraits/women/3.jpg',
                    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
                    experience: 4,
                    education: 'Bachelor en Design',
                    match_score: 78,
                    availability: 'available'
                },
                {
                    id: 'cand4',
                    full_name: 'Nicolas Lambert',
                    title: 'DevOps Engineer',
                    location: 'Toulouse',
                    avatar_url: 'https://randomuser.me/api/portraits/men/4.jpg',
                    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
                    experience: 6,
                    education: 'Master en Systèmes Informatiques',
                    match_score: 88,
                    availability: 'unavailable'
                },
                {
                    id: 'cand5',
                    full_name: 'Alexandre Petit',
                    title: 'Data Scientist',
                    location: 'Paris',
                    avatar_url: 'https://randomuser.me/api/portraits/men/5.jpg',
                    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
                    experience: 3,
                    education: 'Doctorat en Statistiques',
                    match_score: 90,
                    availability: 'available'
                },
                {
                    id: 'cand6',
                    full_name: 'Léa Bernard',
                    title: 'Marketing Manager',
                    location: 'Marseille',
                    avatar_url: 'https://randomuser.me/api/portraits/women/6.jpg',
                    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media'],
                    experience: 8,
                    education: 'Master en Marketing Digital',
                    match_score: 75,
                    availability: 'limited'
                }
            ];
            // Filtrer les candidats en fonction des critères
            let filteredCandidates = [...mockCandidates];
            if (search) {
                const searchLower = search.toLowerCase();
                filteredCandidates = filteredCandidates.filter(candidate => candidate.full_name.toLowerCase().includes(searchLower) ||
                    candidate.title.toLowerCase().includes(searchLower) ||
                    candidate.skills.some(skill => skill.toLowerCase().includes(searchLower)));
            }
            if (selectedSkills.length > 0) {
                filteredCandidates = filteredCandidates.filter(candidate => selectedSkills.some(skill => candidate.skills.includes(skill)));
            }
            if (experienceMin !== '') {
                filteredCandidates = filteredCandidates.filter(candidate => candidate.experience >= experienceMin);
            }
            if (location) {
                filteredCandidates = filteredCandidates.filter(candidate => candidate.location.toLowerCase().includes(location.toLowerCase()));
            }
            if (availability) {
                filteredCandidates = filteredCandidates.filter(candidate => candidate.availability === availability);
            }
            // Simuler les favoris
            const mockFavorites = {
                'cand1': true,
                'cand5': true
            };
            setCandidates(filteredCandidates);
            setFavorites(mockFavorites);
        }
        catch (error) {
            console.error('Error loading candidates:', error);
        }
        finally {
            setLoading(false);
        }
    });
    const toggleFavorite = (candidateId) => __awaiter(this, void 0, void 0, function* () {
        setFavorites(prev => (Object.assign(Object.assign({}, prev), { [candidateId]: !prev[candidateId] })));
        // Dans une vraie application, on sauvegarderait ce changement dans la base de données
    });
    const handleViewCandidate = (candidate) => {
        setSelectedCandidate(candidate);
        setShowDetailModal(true);
    };
    const getAvailabilityLabel = (availability) => {
        switch (availability) {
            case 'available':
                return 'Disponible';
            case 'limited':
                return 'Disponibilité limitée';
            case 'unavailable':
                return 'Non disponible';
            default:
                return availability;
        }
    };
    const getAvailabilityColor = (availability) => {
        switch (availability) {
            case 'available':
                return 'bg-green-600 text-green-100';
            case 'limited':
                return 'bg-yellow-600 text-yellow-100';
            case 'unavailable':
                return 'bg-red-600 text-red-100';
            default:
                return 'bg-gray-600 text-gray-100';
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Recherche de candidats" }), _jsx("p", { className: "text-gray-400 mt-1", children: "Trouvez les meilleurs talents pour vos offres d'emploi" })] }), _jsxs("div", { className: "card mb-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Rechercher par nom, titre ou comp\u00E9tence...", className: "w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" })] }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: "btn-secondary flex items-center gap-2", children: [_jsx(AdjustmentsHorizontalIcon, { className: "h-5 w-5" }), "Filtres avanc\u00E9s"] })] }), showFilters && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-6 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-white mb-2", children: "Comp\u00E9tences" }), _jsx("div", { className: "flex flex-wrap gap-2", children: skillsList.map((skill) => (_jsx("button", { onClick: () => {
                                                if (selectedSkills.includes(skill)) {
                                                    setSelectedSkills(selectedSkills.filter(s => s !== skill));
                                                }
                                                else {
                                                    setSelectedSkills([...selectedSkills, skill]);
                                                }
                                            }, className: `px-3 py-1 rounded-full text-sm ${selectedSkills.includes(skill)
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-white/10 text-gray-300 hover:bg-white/20'}`, children: skill }, skill))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-white mb-2", children: "Exp\u00E9rience minimum" }), _jsx("input", { type: "number", value: experienceMin, onChange: (e) => setExperienceMin(e.target.value ? Number(e.target.value) : ''), placeholder: "Ann\u00E9es d'exp\u00E9rience", className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-white mb-2", children: "Localisation" }), _jsx("input", { type: "text", value: location, onChange: (e) => setLocation(e.target.value), placeholder: "Ville ou r\u00E9gion", className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-white mb-2", children: "Disponibilit\u00E9" }), _jsxs("select", { value: availability || '', onChange: (e) => setAvailability(e.target.value || null), className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500", children: [_jsx("option", { value: "", children: "Toutes les disponibilit\u00E9s" }), _jsx("option", { value: "available", children: "Disponible" }), _jsx("option", { value: "limited", children: "Disponibilit\u00E9 limit\u00E9e" }), _jsx("option", { value: "unavailable", children: "Non disponible" })] })] })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: () => {
                                        setSelectedSkills([]);
                                        setExperienceMin('');
                                        setLocation('');
                                        setAvailability(null);
                                    }, className: "btn-secondary", children: "R\u00E9initialiser les filtres" }) })] }))] }), loading ? (_jsx("div", { className: "flex justify-center py-12", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400" }) })) : (_jsx("div", { className: "space-y-6", children: candidates.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-400", children: "Aucun candidat ne correspond \u00E0 vos crit\u00E8res" }) })) : (candidates.map((candidate) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "card hover:bg-white/10 transition-colors", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: candidate.avatar_url, alt: candidate.full_name, className: "h-16 w-16 rounded-full object-cover" }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-white", children: candidate.full_name }), _jsx("p", { className: "text-gray-400", children: candidate.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1 text-sm text-gray-400", children: [_jsx(MapPinIcon, { className: "h-4 w-4" }), candidate.location, _jsx("span", { className: "mx-1", children: "\u2022" }), _jsx(BriefcaseIcon, { className: "h-4 w-4" }), candidate.experience, " ans d'exp\u00E9rience", _jsx("span", { className: "mx-1", children: "\u2022" }), _jsx(AcademicCapIcon, { className: "h-4 w-4" }), candidate.education] })] })] }), _jsxs("div", { className: "flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap gap-2 mb-2", children: [candidate.skills.slice(0, 4).map((skill) => (_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-600/20 text-primary-400", children: skill }, skill))), candidate.skills.length > 4 && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300", children: ["+", candidate.skills.length - 4] }))] }), _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(candidate.availability)}`, children: getAvailabilityLabel(candidate.availability) })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full flex items-center", children: [_jsx(StarIcon, { className: "h-4 w-4 mr-1" }), _jsxs("span", { className: "font-medium", children: [candidate.match_score, "% match"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => toggleFavorite(candidate.id), className: "p-2 text-gray-400 hover:text-primary-400 rounded-full hover:bg-white/10 transition-colors", children: favorites[candidate.id] ? (_jsx(BookmarkIconSolid, { className: "h-5 w-5 text-primary-400" })) : (_jsx(BookmarkIcon, { className: "h-5 w-5" })) }), _jsx("button", { onClick: () => handleViewCandidate(candidate), className: "btn-primary", children: "Voir le profil" })] })] })] })] }) }, candidate.id)))) })), selectedCandidate && (_jsx(CandidateDetailModal, { isOpen: showDetailModal, onClose: () => {
                    setShowDetailModal(false);
                    setSelectedCandidate(null);
                }, candidate: selectedCandidate }))] }));
}
export default CandidateSearch;
