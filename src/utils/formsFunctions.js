//En general los input tienen la misma estructura para poder ser reutilizados
//con distintos tipos de formularios (TEA, etc.)
export function handleInputChange(e, setFormValues){
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
}