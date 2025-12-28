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
    const {setBck} = useContext(UserContext);

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
        if (!outfits || outfits.length === 0) {
            setFilteredOutfits([]);
            return;
        }

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
            {/* Compact Search/Filter Bar - Less Prominent */}
            <div style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.7)',
                borderBottom: '1px solid rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Compact Search */}
                    <TextField
                        placeholder="Search..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon style={{ fontSize: '18px', marginRight: '4px', color: '#999' }} />
                        }}
                        style={{
                            width: '200px',
                            background: 'white'
                        }}
                    />

                    {/* Compact Filter Toggle */}
                    <IconButton
                        size="small"
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            position: 'relative',
                            background: showFilters ? '#e3f2fd' : 'white',
                            border: '1px solid #ddd'
                        }}
                        title="Filter options"
                    >
                        <FilterListIcon style={{ fontSize: '20px' }} />
                        {activeFiltersCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: 2,
                                right: 2,
                                background: '#f44336',
                                color: 'white',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>
                                {activeFiltersCount}
                            </span>
                        )}
                    </IconButton>
                </div>

                {/* Collapsible Filter Options - Less Prominent */}
                {showFilters && (
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '10px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid #eee'
                    }}>
                        <FormControl variant="outlined" size="small" style={{ minWidth: 110, background: 'white' }}>
                            <InputLabel style={{ fontSize: '14px' }}>Temperature</InputLabel>
                            <Select
                                value={temperatureFilter}
                                onChange={(e) => setTemperatureFilter(e.target.value)}
                                label="Temperature"
                                style={{ fontSize: '14px' }}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="hot">Hot</MenuItem>
                                <MenuItem value="neutral">Neutral</MenuItem>
                                <MenuItem value="cold">Cold</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" size="small" style={{ minWidth: 110, background: 'white' }}>
                            <InputLabel style={{ fontSize: '14px' }}>Context</InputLabel>
                            <Select
                                value={contextFilter}
                                onChange={(e) => setContextFilter(e.target.value)}
                                label="Context"
                                style={{ fontSize: '14px' }}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="home">Home</MenuItem>
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="casual">Casual</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" size="small" style={{ minWidth: 110, background: 'white' }}>
                            <InputLabel style={{ fontSize: '14px' }}>Weather</InputLabel>
                            <Select
                                value={weatherFilter}
                                onChange={(e) => setWeatherFilter(e.target.value)}
                                label="Weather"
                                style={{ fontSize: '14px' }}
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
                                    padding: '5px 12px',
                                    background: '#f5f5f5',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    height: '40px'
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                )}
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
                /* Carousel - Similar to master's Swiper style but with CSS */
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: '30px',
                    padding: '30px 20px',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch'
                }}>
                    {filteredOutfits.map(outfit => (
                        <div key={outfit.id} style={{
                            flex: '0 0 280px',
                            scrollSnapAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            padding: '15px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}>
                            {/* Outfit Name - Master style */}
                            <h1 style={{
                                textAlign: 'center',
                                marginBottom: '10px',
                                fontSize: '1.3em',
                                color: '#333',
                                fontWeight: '500'
                            }}>{outfit.outfit}</h1>

                            {/* Action Buttons - Subtle, top right corner */}
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                display: 'flex',
                                gap: '5px',
                                opacity: 0.7
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                                <IconButton
                                    size="small"
                                    onClick={() => editOutfit(outfit)}
                                    title="Edit outfit"
                                    style={{
                                        background: 'rgba(255,255,255,0.9)',
                                        padding: '5px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    <EditIcon style={{ width: '16px', height: '16px' }} />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => removeFit(outfit)}
                                    title="Delete outfit"
                                    style={{
                                        background: 'rgba(255,255,255,0.9)',
                                        padding: '5px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    <img src={hanger} alt="delete" width="16" height="16" />
                                </IconButton>
                            </div>

                            {/* Outfit Image - Master style */}
                            <img
                                src={outfit.image}
                                alt="outfit"
                                style={{
                                    width: '100%',
                                    height: '280px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    marginBottom: '10px'
                                }}
                            />

                            {/* Metadata Tags - Subtle and compact */}
                            {(outfit.temperature || outfit.context || outfit.weather) && (
                                <div style={{
                                    display: 'flex',
                                    gap: '4px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    marginTop: '8px'
                                }}>
                                    {outfit.temperature && (
                                        <Chip
                                            label={outfit.temperature}
                                            size="small"
                                            style={{
                                                height: '22px',
                                                fontSize: '11px',
                                                background: outfit.temperature === 'hot' ? '#ffebee' :
                                                           outfit.temperature === 'cold' ? '#e3f2fd' : '#fff3e0',
                                                color: outfit.temperature === 'hot' ? '#d32f2f' :
                                                       outfit.temperature === 'cold' ? '#1976d2' : '#e65100',
                                                border: 'none'
                                            }}
                                        />
                                    )}
                                    {outfit.context && (
                                        <Chip
                                            label={outfit.context}
                                            size="small"
                                            style={{
                                                height: '22px',
                                                fontSize: '11px',
                                                background: '#f5f5f5',
                                                color: '#666'
                                            }}
                                        />
                                    )}
                                    {outfit.weather && (
                                        <Chip
                                            label={outfit.weather}
                                            size="small"
                                            style={{
                                                height: '22px',
                                                fontSize: '11px',
                                                background: '#f5f5f5',
                                                color: '#666'
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Outfit Button - Master style */}
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
