import { useState } from "react";
import { api } from "../utils/api";
import { Guest, useGuestsStore } from "./useGuestsStore";

export const useGuests = () => {
  const { setGuests } = useGuestsStore()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGuests = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/convidados');
      setGuests(response.data)
    } catch (error: any) {
      console.log(error)
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }

  const addGuest = async (guest: Guest) => {
    setIsLoading(true);
    try {
      await api.post('/convidados', guest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchGuests();
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const editGuestById = async (id: any, updatedGuest: Partial<Guest>) => {
    setIsLoading(true);
    try {
      await api.put(`/convidados/${id}`, updatedGuest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchGuests();
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeGuestById = async (id: any) => {
    setIsLoading(true);
    try {
      await api.delete(`/convidados/${id}`);
      fetchGuests();
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const findGuestById = async (id: any) => {
    console.log(id)
    const response = await api.get(`/convidados/${id}`)
    return response
  }

  return {
    fetchGuests,
    addGuest,
    editGuestById,
    removeGuestById,
    findGuestById,
    error,
    isLoading
  };
}
