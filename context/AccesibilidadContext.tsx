import { createContext, useContext, useState, ReactNode } from 'react';

const AccesibilidadContext = createContext<any>(null);

export const AccesibilidadProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState({ altoContraste: false, textoGRande: false, lecturaFacil: false, modoSimplificado: false });
    return (
        <AccesibilidadContext.Provider value={{ config, setConfig }}>
            {children}
        </AccesibilidadContext.Provider>
    );
};

export const useAccesibilidad = () => useContext(AccesibilidadContext);