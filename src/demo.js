import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";


export default function MaterialTableDemo() {
  // const [state, setState] = React.useState({
    // columns: [
    //   { title: 'Name', field: 'name' },
    //   { title: 'Surname', field: 'surname' },
    //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //   {
    //     title: 'Birth Place',
    //     field: 'birthCity',
    //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //   },
    // ],
    // data: [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   {
    //     name: 'Zerya Betül',
    //     surname: 'Baran',
    //     birthYear: 2017,
    //     birthCity: 34,
    //   },
    // ],
  // });
  const [state, setState] = React.useState({ hits: [] });
  React.useEffect(async () => {
    const result = await axios.get(
      "http://demo3440516.mockable.io/inquiry"
    );
    setState(result.data);
  }, []);

  return (
    <MaterialTable
      title="문의 리스트"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
