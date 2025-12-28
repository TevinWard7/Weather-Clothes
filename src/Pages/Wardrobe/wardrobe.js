import React, { useEffect, useState, useContext } from "react";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Chip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./wardrobe.css";
import hanger from "../../images/hanger.png";
import closet from "../../images/closet.png";
import { UserContext } from "../../utils/UserContext";
import garmetsBck from "../../images/garmets.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper.min.css';

const W2 = () => {
    const [{ user }] = useStateValue();
    const [outfits, setOutfits] = useState([]);
    const [filteredOutfits, setFilteredOutfits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [temperatureFilter, setTemperatureFilter] = useState("all");
    const [contextFilter, setContextFilter] = useState("all");
    const [weatherFilter, setWeatherFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const history = useHistory();
    const {setBck, setInfoPop, setInfoContent} = useContext(UserContext);

    // Get outfits with loading state
    useEffect(() => {
        setBck(`url(${garmetsBck})`);

        const fetchOutfits = async () => {
            try {
                setLoading(true);
                const snapshot = await db
                    .collection("wardrobe")
                    .where('uid', '==', user.uid)
                    .get();

                const outfitsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setOutfits(outfitsData);
                setFilteredOutfits(outfitsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching outfits:", error);
                alert("Error loading outfits. Please refresh the page.");
                setLoading(false);
            }
        };

        fetchOutfits();

        // Also set up real-time listener for updates
        const unsubscribe = db
            .collection("wardrobe")
            .where('uid', '==', user.uid)
            .onSnapshot(snapshot => {
                const outfitsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOutfits(outfitsData);
            });

        return () => unsubscribe();

    }, [user.uid, setBck]);

    // Filter and search logic
    useEffect(() => {
        let result = [...outfits];

        // Search filter
        if (searchTerm) {
            result = result.filter(outfit =>
                outfit.outfit && outfit.outfit.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Temperature filter
        if (temperatureFilter !== "all") {
            result = result.filter(outfit => outfit.temperature === temperatureFilter);
        }

        // Context filter
        if (contextFilter !== "all") {
            result = result.filter(outfit => outfit.context === contextFilter);
        }

        // Weather filter
        if (weatherFilter !== "all") {
            result = result.filter(outfit => outfit.weather === weatherFilter);
        }

        setFilteredOutfits(result);
    }, [searchTerm, temperatureFilter, contextFilter, weatherFilter, outfits]);

    const removeFit = (outfit) => {
        const confirmDl = window.confirm(`Delete "${outfit.outfit}"?`);

        if (confirmDl) {
            db.collection("wardrobe")
                .doc(outfit.id)
                .delete()
                .then(() => {
                    setInfoPop("block");
                    setInfoContent("Outfit deleted successfully");
                })
                .catch((error) => {
                    console.error("Error removing outfit:", error);
                    alert("Error removing outfit. Please try again.");
                });
        }
    };

    const editOutfit = (outfit) => {
        // Store outfit data in localStorage for editing
        localStorage.setItem('editingOutfit', JSON.stringify(outfit));
        history.push(`/add?edit=${outfit.id}`);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setTemperatureFilter("all");
        setContextFilter("all");
        setWeatherFilter("all");
    };

    const activeFiltersCount = [temperatureFilter, contextFilter, weatherFilter]
        .filter(f => f !== "all").length;

    // Retrieve slide # var from css
    let num = getComputedStyle(document.documentElement).getPropertyValue('--slideNum');

    // Render empty state
    if (!loading && outfits.length === 0) {
        return (
            <div className="wardrobe-page">
                <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <img src={closet} alt="closet" style={{ width: '150px', opacity: 0.5 }} />
                    <h2 style={{ marginTop: '20px', color: '#666' }}>Your Wardrobe is Empty</h2>
                    <p style={{ color: '#999', marginBottom: '20px' }}>
                        Start adding outfits to get personalized suggestions!
                    </p>
                    <IconButton
                        onClick={() => history.push("/add")}
                        style={{
                            background: '#1976d2',
                            color: 'white',
                            padding: '15px'
                        }}
                    >
                        <AddOutlinedIcon />
                    </IconButton>
                    <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Add Your First Outfit</p>
                </div>
            </div>
        );
    }

    return(
        <div className="wardrobe-page">
            {/* Search and Filter Bar */}
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <TextField
                        placeholder="Search outfits..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon style={{ marginRight: '8px', color: '#999' }} />
                        }}
                        style={{ flex: 1, minWidth: '200px' }}
                    />

                    {/* Filter Toggle */}
                    <IconButton
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ position: 'relative' }}
                    >
                        <FilterListIcon />
                        {activeFiltersCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                background: '#f44336',
                                color: 'white',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {activeFiltersCount}
                            </span>
                        )}
                    </IconButton>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                            <InputLabel>Temperature</InputLabel>
                            <Select
                                value={temperatureFilter}
                                onChange={(e) => setTemperatureFilter(e.target.value)}
                                label="Temperature"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="hot">Hot</MenuItem>
                                <MenuItem value="neutral">Neutral</MenuItem>
                                <MenuItem value="cold">Cold</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                            <InputLabel>Context</InputLabel>
                            <Select
                                value={contextFilter}
                                onChange={(e) => setContextFilter(e.target.value)}
                                label="Context"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="home">Home</MenuItem>
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="casual">Casual</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                            <InputLabel>Weather</InputLabel>
                            <Select
                                value={weatherFilter}
                                onChange={(e) => setWeatherFilter(e.target.value)}
                                label="Weather"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="clear Sky">Clear Sky</MenuItem>
                                <MenuItem value="overcast">Overcast</MenuItem>
                                <MenuItem value="rain">Rain</MenuItem>
                                <MenuItem value="sunny">Sunny</MenuItem>
                            </Select>
                        </FormControl>

                        {activeFiltersCount > 0 && (
                            <button
                                onClick={resetFilters}
                                style={{
                                    padding: '5px 15px',
                                    background: '#f5f5f5',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Results count */}
                <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                    Showing {filteredOutfits.length} of {outfits.length} outfits
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <CircularProgress />
                    <p style={{ marginTop: '20px' }}>Loading your wardrobe...</p>
                </div>
            ) : filteredOutfits.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <p style={{ color: '#666', fontSize: '18px' }}>No outfits match your filters</p>
                    <button
                        onClick={resetFilters}
                        style={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            background: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <Swiper spaceBetween={50} slidesPerView={num} className="mySwiper">
                    {filteredOutfits.map(outfit => (
                        <SwiperSlide className="swiper-slide" key={outfit.id}>
                            {/* Outfit Name */}
                            <h1 id="fit-name">{outfit.outfit}</h1>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
                                <IconButton
                                    onClick={() => editOutfit(outfit)}
                                    title="Edit outfit"
                                    style={{ background: '#fff', padding: '8px' }}
                                >
                                    <EditIcon style={{ width: '20px', height: '20px' }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => removeFit(outfit)}
                                    title="Delete outfit"
                                    style={{ background: '#fff', padding: '8px' }}
                                >
                                    <img src={hanger} alt="delete" width="20" height="20" />
                                </IconButton>
                            </div>

                            {/* Outfit Image */}
                            <img src={outfit.image} alt="outfit" id="fit-pic" />

                            {/* Metadata Tags */}
                            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
                                {outfit.temperature && (
                                    <Chip
                                        label={outfit.temperature}
                                        size="small"
                                        style={{
                                            background: outfit.temperature === 'hot' ? '#ff5722' :
                                                       outfit.temperature === 'cold' ? '#2196f3' : '#ff9800',
                                            color: 'white'
                                        }}
                                    />
                                )}
                                {outfit.context && (
                                    <Chip
                                        label={outfit.context}
                                        size="small"
                                        variant="outlined"
                                    />
                                )}
                                {outfit.weather && (
                                    <Chip
                                        label={outfit.weather}
                                        size="small"
                                        variant="outlined"
                                    />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Add Outfit Button */}
            <div className="add-fit">
                <img src={closet} alt="closet"/><br/>
                <IconButton onClick={() => history.push("/add")}>
                    <AddOutlinedIcon />
                </IconButton>
                <p>Add Outfit</p>
            </div>
        </div>
    );
};

export default W2;
