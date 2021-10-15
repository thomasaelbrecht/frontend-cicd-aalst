import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    useMemo
  } from 'react';
  import axios from 'axios';
  import config from '../config.json';
  
  export const PlacesContext = createContext();
  export const usePlaces = () => useContext(PlacesContext);
  
  export const PlacesProvider = ({
    children
  }) => {
    const [currentPlace, setCurrentPlace] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
  
    const refreshPlaces = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        const {
          data
        } = await axios.get(`${config.base_url}places`);
        setPlaces(data.data);
        return data.data;
      } catch (error) { 
        setError(error);
      } finally {
        setLoading(false)
      }
      
    }, []);
  
    useEffect(() => {
      if (places?.length === 0) {
        refreshPlaces();
      }
    }, [refreshPlaces, places]);
  
    const ratePlace = useCallback(async ({
      id,
      name,
      rating
    }) => {
      setError();
      setLoading(true);
      let data = {
        name,
        rating
      };
      let method = 'put';
      try {
        const {
          changedPlace
        } = await axios({
          method,
          url: `${config.base_url}places/${id}`,
          data,
        });
        await refreshPlaces();
        return changedPlace;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshPlaces]);
  
    const createOrUpdatePlace = useCallback(async ({
      id,
      name,
      rating
    }) => {
      setError();
      setLoading(true);
      let data = {
        name,
        rating
      };
      let method = id ? 'put' : 'post';
      let url = `${config.base_url}places/${id ?? ''}`;
      try {
        const {
          changedPlace
        } = await axios({
          method,
          url,
          data,
        });
        await refreshPlaces();
        return changedPlace;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshPlaces]);
  
    const deletePlace = useCallback(async (id) => {
      setLoading(true);
      setError();
      try {
        const {
          data
        } = await axios({
          method: 'delete',
          url: `${config.base_url}places/${id}`,
        });
        refreshPlaces();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false)
      }
    }, [refreshPlaces]);
  
    const value = useMemo(() => ({
      currentPlace,
      setCurrentPlace,
      places,
      error,
      loading,
      ratePlace,
      deletePlace,
      createOrUpdatePlace,
    }), [places, error, loading, setCurrentPlace, ratePlace, deletePlace, currentPlace, createOrUpdatePlace])
  
    return ( 
        <PlacesContext.Provider value={value}>
        {children}
      </PlacesContext.Provider>
    );
  };