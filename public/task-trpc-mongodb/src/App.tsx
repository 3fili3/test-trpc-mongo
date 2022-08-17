import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { trpc } from "./config/trpc";
import './App.css'
import { useState } from "react";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    url: "http://localhost:3100/api/v1/"
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent></AppContent>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

function AppContent() {
  
  const resultAPI = (trpc.useQuery(["get_contacts"]));
  const [nameContact, setNameContact] = useState("");
  const [typeContact, setTypeContact] = useState("Correo");
  const [valueContact, setValueContact] = useState("");

  const queryClient = useQueryClient();



  const save_contacts = trpc.useMutation(["post_contacts"]);

  return (
    <div className="App">
      <div>
        <input type="text" onChange={(val) => setNameContact(val.target.value)} />
        <input type="text" onChange={(val) => setValueContact(val.target.value)} />
        <select onChange={(val) => setTypeContact(val.target.value)} >
          <option value="Correo" >Correo</option>
          <option value="Teléfono">Teléfono</option>
          <option value="Red Social">Red Social</option>
        </select>
        <button onClick={() => {

          save_contacts.mutate({
            name: nameContact,
            valueContact: {
              type: typeContact,
              value: valueContact
            }
          }, {
            onSuccess: (result) => {
              queryClient.invalidateQueries(["get_contacts"]);
            }
          });

        }}>Enviar datos</button>
      </div>
      <table style={{
        width: "100%",
        marginTop: "50px"
      }} >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo Contacto</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            resultAPI.data?.map((value, index) => {
              return (
                <tr key={index} style={{
                  textAlign: "center"
                }}>
                  <td>
                    {value.name}
                  </td>
                  <td>
                    {value.valueContact.type}
                  </td>
                  <td>
                    {value.valueContact.value}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )


}

export default App
