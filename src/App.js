import React from "react";
import { useJsonFetch } from "./hooks/http.hooks";

export default function App() {
  const data = useJsonFetch("data"); //успешное получение данных
  console.log(data.data);

  const loading = useJsonFetch("loading"); //индикатор загрузки

  useJsonFetch("error"); //получение 500 ошибки
  
  return (
    <React.Fragment>
      <div>{loading.loading && <p>loading...</p>}</div>
    </React.Fragment>
  );
}
