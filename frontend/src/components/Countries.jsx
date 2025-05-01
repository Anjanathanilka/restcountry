import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  LinearProgress,
  MenuItem,
  Collapse,
  IconButton,
  Tabs,
  Tab,
  Box,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RefreshIcon from '@mui/icons-material/Refresh';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const allRegions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const Countries = ({ clearSelectedRegionHandler, selectedRegion }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState({});
  const [region, setRegion] = useState(selectedRegion || '');
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [countryCode, setCountryCode] = useState('');

  // Fetch all countries on initial mount (API Endpoint 1: GET /all)
  useEffect(() => {
    if (currentTab === 0) {
      fetchAllCountries();
    }
  }, [currentTab]);

  // Fetch region data when region changes (API Endpoint 3: GET /region/{region})
  useEffect(() => {
    if (!region || currentTab !== 2) return;
    
    fetchCountriesByRegion(region);
  }, [region, currentTab]);

  // Fetch all countries (API Endpoint 1: GET /all)
  const fetchAllCountries = () => {
    setLoading(true);
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data);
        extractLanguages(response.data);
        setExpanded({});
      })
      .catch(error => {
        console.log(error);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  // Fetch countries by region (API Endpoint 3: GET /region/{region})
  const fetchCountriesByRegion = (region) => {
    setLoading(true);
    axios.get(`https://restcountries.com/v3.1/region/${region}`)
      .then(response => {
        setData(response.data);
        extractLanguages(response.data);
        setExpanded({});
      })
      .catch(error => {
        console.log(error);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  // Search by name (API Endpoint 2: GET /name/{name})
  const searchByName = () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    
    axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        setData(Array.isArray(response.data) ? response.data : [response.data]);
        extractLanguages(response.data);
        setExpanded({});
      })
      .catch(error => {
        console.log(error);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  // Search by code (API Endpoint 4: GET /alpha/{code})
  const searchByCode = () => {
    if (!countryCode.trim()) return;
    setLoading(true);
    
    axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => {
        setData(Array.isArray(response.data) ? response.data : [response.data]);
        extractLanguages(Array.isArray(response.data) ? response.data : [response.data]);
        setExpanded({});
      })
      .catch(error => {
        console.log(error);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  // Extract unique languages from countries
  const extractLanguages = (countries) => {
    const langs = new Set();
    countries.forEach((country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang) => langs.add(lang));
      }
    });
    setLanguageList([...langs].sort());
  };

  // Filtered data by selected language
  const filteredData = selectedLanguage
    ? data.filter(country =>
        country.languages &&
        Object.values(country.languages).includes(selectedLanguage)
      )
    : data;

  // Toggle dropdown for details
  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setData([]);
    setSearchTerm('');
    setCountryCode('');
    setSelectedLanguage('');
  };

  // Common TextField styling
  const textFieldStyle = {
    width: '100%',
    height: '56px'
  };

  return (
    <Container fixed>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="API endpoints tabs" centered>
          <Tab icon={<PublicIcon />} label="All Countries" />
          <Tab icon={<SearchIcon />} label="Search by Name" />
          <Tab icon={<FilterAltIcon />} label="Filter by Region" />
          <Tab icon={<LanguageIcon />} label="Search by Code" />
        </Tabs>
      </Box>
      
      {loading ? (
        <div className="progress">
          <LinearProgress color="primary" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} sx={{ margin: '20px 0 20px' }}>
            {/* Tab 0: All Countries */}
            {currentTab === 0 && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Filter by Language"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    variant="outlined"
                    style={textFieldStyle}
                    InputProps={{
                      style: { height: '56px' }
                    }}
                  >
                    <MenuItem value="">All Languages</MenuItem>
                    {languageList.map((lang, index) => (
                      <MenuItem key={index} value={lang}>
                        {lang}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    onClick={fetchAllCountries}
                    style={{ height: '56px' }}
                    startIcon={<RefreshIcon />}
                  >
                    Refresh All Countries
                  </Button>
                </Grid>
              </>
            )}

            {/* Tab 1: Search by Name */}
            {currentTab === 1 && (
              <>
                <Grid item xs={12} sm={8} md={6}>
                  <TextField
                    fullWidth
                    label="Search Country by Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchByName()}
                    style={textFieldStyle}
                    InputProps={{
                      style: { height: '56px' }
                    }}
                    helperText="Example: 'united', 'france', 'brazil'"
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} md={3}>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    onClick={searchByName}
                    style={{ height: '56px' }}
                    startIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </Grid>
                
                {data.length > 0 && (
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      select
                      label="Filter by Language"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      variant="outlined"
                      style={textFieldStyle}
                      InputProps={{
                        style: { height: '56px' }
                      }}
                    >
                      <MenuItem value="">All Languages</MenuItem>
                      {languageList.map((lang, index) => (
                        <MenuItem key={index} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
              </>
            )}

            {/* Tab 2: Filter by Region */}
            {currentTab === 2 && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Filter by Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    variant="outlined"
                    style={textFieldStyle}
                    InputProps={{
                      style: { height: '56px' }
                    }}
                  >
                    <MenuItem value="">Select Region</MenuItem>
                    {allRegions.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                {data.length > 0 && (
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      select
                      label="Filter by Language"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      variant="outlined"
                      style={textFieldStyle}
                      InputProps={{
                        style: { height: '56px' }
                      }}
                    >
                      <MenuItem value="">All Languages</MenuItem>
                      {languageList.map((lang, index) => (
                        <MenuItem key={index} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
                
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    onClick={clearSelectedRegionHandler}
                    style={{ height: '56px' }}
                  >
                    Reset Region
                  </Button>
                </Grid>
              </>
            )}

            {/* Tab 3: Search by Country Code */}
            {currentTab === 3 && (
              <>
                <Grid item xs={12} sm={8} md={6}>
                  <TextField
                    fullWidth
                    label="Search by Country Code"
                    variant="outlined"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchByCode()}
                    style={textFieldStyle}
                    InputProps={{
                      style: { height: '56px' }
                    }}
                    helperText="Example: 'USA', 'FR', 'BRA', 'JPN'"
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} md={3}>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    onClick={searchByCode}
                    style={{ height: '56px' }}
                    startIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </Grid>
              </>
            )}
          </Grid>

          {/* Results count */}
          {filteredData.length > 0 && (
            <Typography variant="subtitle1" gutterBottom>
              Showing {filteredData.length} {filteredData.length === 1 ? 'country' : 'countries'}
            </Typography>
          )}

          {/* Country cards */}
          <Grid container spacing={3} sx={{ margin: '20px 0' }}>
            {filteredData.map((country) => {
              const key = country.cca3 || country.cca2;
              return (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                      component="img"
                      image={country.flags?.png}
                      alt={country.name?.common}
                      title={country.name?.common}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {country.name.common}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {country.cca3}
                      </Typography>
                      <IconButton
                        onClick={() => toggleExpand(key)}
                        sx={{ float: 'right' }}
                      >
                        {expanded[key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </CardContent>

                    <Collapse in={expanded[key]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {`Population: ${country.population?.toLocaleString()}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {`Region: ${country.region}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {`Capital: ${country.capital?.join(', ') || 'N/A'}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {`Languages: ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {`Currencies: ${
                            country.currencies
                              ? Object.values(country.currencies)
                                  .map((cur) => `${cur.name} (${cur.symbol})`)
                                  .join(', ')
                              : 'N/A'
                          }`}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          
          {/* No results message */}
          {filteredData.length === 0 && !loading && currentTab !== 0 && (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              {currentTab === 1 && searchTerm ? "No countries found matching your search." : 
               currentTab === 2 && region ? "No countries found in this region." : 
               currentTab === 3 && countryCode ? "No country found with this code." : 
               "Please enter your search criteria."}
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Countries;