
import { useState } from 'react';
import db from '../src/components/firestore.js';

//Importar db (dedenciales de firebase firestore)



function App() {

  const [users, setUsers]=useState('[]')
  const [isError, setisError] = useState(false)
  const [message, setmessage] = useState('')
  const [dataUser, setDataUser] = useState({
    fullName:'',
    username:'',
    password:'',
    id:'', //Tomar el id de cada documento al buscarlo
  })

  const handleChange = (e) => {
    e.prevenDefault ();
    setDataUser({
        ...dataUser,
          [e.target.name]: e.target.value
        });
  }

    //Boton guardar

  const onSave = (e) => {
    e.preventDefault();
    // Buscar el userName
    db.collection('users')
      .where('userName', '==', dataUser.userName)
      .get()
      .then((documentss) => {
        if (documentss.empty) { // No encuentra el userName
          db.collection('users')
            .add({
              fullName: dataUser.fullName,
              userName: dataUser.userName,
              password: dataUser.password
            })
          setMessage('Usuario creado correctamente');
          setTimeout(() => {
            setMessage('');
          }, 2000)
          setDataUser({
            fullName: '',
            userName: '',
            password: ''
          })
          setIsError(false)
        }
        else {
          setIsError(true);
          setMessage("Usuario ya está asignado a otro... Inténtelo nuevamente ...")
        }
      }
      )
  }

    //Boton buscar

const onSearch = (e) => {
    e.preventDefault();
    db.collection('users')
      .where('userName', '==', dataUser.userName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) { // Encontró el userName
          querySnapshot.forEach((doc) => {
            setDataUser({
              fullName: doc.data().fullName,
              userName: doc.data().userName,
              id: doc.id
            })
            setMessage('')
          })
        }
        else {
          setIsError(true);
          setMessage("El usuario no existe...Inténtelo con otro ...")
        }
      })
    }
      
    
      //Boton de actualizar

      const onUpdate = (event) => {
        event.preventDefault();
        //Buscar el username, si existe, cambiar el fullname y el password
        db.collection("users").doc(dataUsers.id).update ({
          fullName: dataUser.fullName,
          userName: dataUser.userName,
          password: dataUser.password
        })  
        //Enviar un mensaje al formulario que indique que si se ha hecho la operacion.
            setisError(false)
            setmessage("El usuario se ha actualizado correctamente...");
            setTimeout(()=>{setMessage("")},2000)
      }

/*<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Listado de Usuarios</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    lUsers.map(muser => (
                      <tr key={muser.id}>
                        <td>{muser.username}</td>
                        <td>{muser.name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>*/
  const onDelete=(event)=>{
    event.preventDefault(); //Para que no me genere callbacks
    if(window.confirm("Está seguro que desea eliminar este usuraio?")){
      db.collection("users")
      .doc(dataUser.id)
      .delete()
      .then(()=>{
          setIsError(false)
          setmessage("Usuario eliminado correctamente...")
          //Accion borrar
          setTimeout(()=>{setMessage("")},2000)
          setDataUser({
            fullName: '',
            username: '',
            password: '',
            })
      })
      
    }
    const getAllUsers =(e)=>{
      let list =[];
      e.preventDefault();
      db.collection('users').get().then((doc)=>{
        doc.forEach((dc)=>{
          let id=dc.data().id
          let fullName=dc.data().fullName
          let userName=dc.data().userName
          let objUser={id:id,fullName:fullName,userName:userName}
          list.push(objUser)
      })
      setLUsers(list)
    })
  }




  return (

    
    <div className='container'>
    
      <form >
        <div className='row'>
          <div className='col'>
            <label >Nombre Completo</label>
            <input type="text" 
            placeholder='Nombre Completo'
            id='fullName'
            className='form-control'
            onchange={handleChange}
            value={dataUser.fullName}
            />
          </div>
          </div>
          
        
        <div className='row'>
          <div className='col'>
            <label >Usuario</label>
            <input type="text" 
            placeholder='Nombre de Usuario'
            id='username'
            className='form-control'
            onchange={handleChange}
            value={dataUser.username}
            />
          </div>
          
        </div>
        <div className='row'>
          <div className='col'>
            <label >Contraseña</label>
            <input type="password" 
            placeholder='contraseña'
            id='password'
            className='form-control'
            onchange={handleChange}
            value={dataUser.password}
            />
          </div>
        </div>
        <div className='col'></div>
        <div>
          <div style={'color:red'}></div>
          <button className='btn btn-success' style={{marginTop:10}}>Agregar</button>
          <button className='btn btn-dark' style={{marginTop:10, marginLeft:10}}>Buscar</button>
          <button className='btn btn-warning' style={{marginTop:10, marginLeft:10}} onClick={onUpdate}>Actualizar</button>
          <button className='btn btn-danger' style={{marginTop:10, marginLeft:10}} onClick={onDelete}>Eliminar</button>
          <button className='btn btn-danger' style={{marginTop:10, marginLeft:10}} onClick={onDelete} data-bs-toggle="modal" data-bs-target="#exampleModal">Listar</button>
        </div>
      </form>
   
       /*Formulario modal  */
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Listado de Usuarios</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    lUsers.map(muser => (
                      <tr key={muser.id}>
                        <td>{muser.username}</td>
                        <td>{muser.name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  
   
}
    

    



export default App;
