import {
  FetchView,
  CardView,
  ICardViewOperation,
  ICardViewAction,
} from "react-declarative";
import './TodoCardPage.css'
import {useState} from 'react'

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

import useLoader from "../../hooks/useLoader";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';

export const operations: ICardViewOperation[] = [
  {
    action: "begin-icloud-backup",
    label: "Begin iCloud backup",
    isAvailable: (selectedItems: any[], isAllSelected: boolean) =>
      !!selectedItems.length || isAllSelected,
  },
];

export const actions: ICardViewAction[] = [
  {
    action: "begin-icloud-backup",
    label: "Begin iCloud backup",
  },
];


export const TodoCardPage = () => {
  const { setLoader } = useLoader();
 

  const handleClick = (row: any) => {
    history.push(`/todos_card/${row.id}`);
  };

  const handleOperation = (
    operation: string,
    selectedItems: any[],
    isAllSelected: boolean
  ) => {
    alert(JSON.stringify({ operation, selectedItems, isAllSelected }, null, 2));
  };

  const handleAction = (action: string, item: any) => {
    alert(JSON.stringify({ action, item }, null, 2));
  };

  const ariaLabel = { 'aria-label': 'description' };
  
  const option1 = [
    {label: 'A'},
    {label: 'B'}
  ]
  const [stage, setStage] = useState<any>()
  const [list, setList] = useState<any>()
  const [name, setName] = useState<any>()
  const [surname, setSurname] = useState<any>()
  const [backNumber, setBackNumer] = useState<any>()
  const [position, setPosition] = useState<any>()
  const [workAddress, setWorkAddress] = useState<any>()
  const [country, setCountry] = useState<any>()
  const [city, setCity] = useState<any>()
  const [region, setRegion] = useState<any>()
  const [subscribed, setSubscribed] = useState<any>(false)
  const [address, setAddress] = useState<any>()
  const [keyword, setKeyword] = useState<any>('Taka utilisation SAS Gorgeous COM Walks')
  const onSave = () =>{
    let data = {
      id: Math.random()*9584,
      firstName:name,
      lastName: surname,
      subscribed: subscribed,
      prefix: stage?.label,
      suffix: list?.label,
      jobTitle: position,
      jobArea: workAddress,
      age: backNumber,
      keyword: keyword,
      address: address,
      city:city,
      state: region,
      country: country,
    }
    async function postJSON(data:any) {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result = await response.json();
        setStage(null)
        alert("Success:");
      } catch (error) {
        alert("Error:");
      }
    }
    
    postJSON(data);
  }
  const handleName = (e:any) => {
    setName(e.target.value)
  }
  const handleSurname = (e:any) => {
    setSurname(e.target.value)
  }
  const handleBackNumber = (e:any) => {
    setBackNumer(e.target.value)
  }
  const handlePosition = (e:any) => {
     setPosition(e.target.value)
  }
  const handleWorkAddress = (e:any) => {
     setWorkAddress(e.target.value)
  }
  const handleCountry = (e:any) => {
     setCountry(e.target.value)
  }
  const handleCity = (e:any) => {
     setCity(e.target.value)
  }
  const handleRegion = (e:any) => {
     setRegion(e.target.value)
  }
  const handleAddress = (e:any) => {
     setAddress(e.target.value)
  }
  const handleKeyword = (e:any) => {
    setKeyword(e.target.value)
  }

  

  return (
    <>
    {/* <FetchView
      state={async () => await fetchApi<ITodoItem[]>("/api/v1/todos")}
      onLoadStart={() => setLoader(true)}
      onLoadEnd={() => setLoader(false)}
    >
      {(todos) => (
        <CardView
          sx={{
            height: "calc(100vh - 80px)",
          }}
          operations={operations}
          cardActions={actions}
          handler={(search) => todos.filter((todo) => todo.title.includes(search))}
          onAction={handleAction}
          onCardClick={handleClick}
          onOperation={handleOperation}
        />
        )}
    </FetchView> */}

    <div className="profile">
      {/*starting part of header */}
       <header className="profile-header">
        <div className="header-div">
          <p style={{'color':'gray'}}>Список профилей</p>
          <p>/</p>
          <p>Профиль</p>
        </div>
        <button onClick={onSave} className="header-save-btn">
          cохранить
        </button>
       </header>
       {/* starting part of picture */}
       <section className="profile-picture">
         <div className="picture-left">
           <div className="picture-user"></div>
           <div className='picture-stars'>
           <StarIcon sx={{
            color: 'yellow'
            }} />
           <StarIcon sx={{
            color: 'yellow'
            }} />
           <StarIcon sx={{
            color: 'yellow'
            }} />
           <StarIcon sx={{
            color: 'gray'
            }} />
           <StarIcon sx={{
            color: 'gray'
            }} />
           </div>
         </div>
         <div className="picture-right">
          <div className="right-top">
             <h3>Профиль</h3>
             <div className="right-top-line"></div>
          </div>
          <div className="pic-button-wrapper">
          <Autocomplete
            onChange={(_, value:any ) => setStage(value)}
            disablePortal
            id="combo-box-demo"
            options={option1}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Пол" />}
          />       
          <Autocomplete
           onChange={(_, value:any ) => setList(value)}
            style={{marginTop:'20px'}}
            disablePortal
            id="combo-box-demo"
            options={option1}
            // sx={{ width: 100% }}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Списки" />}
          /> 
          <div className='input-checkbox'>
            <TextField
            style={{marginTop:'20px'}}
            onChange={handleKeyword}
            fullWidth
            id="standard-disabled"
            label="Кодовая фраза"
            defaultValue="Taka utilization SAS Gorgeous COM Walks"
            variant="standard"
            />   
            <div className='input-label'>
            <FormControlLabel control={<Checkbox onChange={(e) => setSubscribed(e?.target?.checked)} />} label="Кодовая фраза" />
            </div>
          </div>      
          </div> 
         </div>
       </section>
       {/* starting of general information */}
       <section className='info'>
         <div className='info-top'>
          <h3>Oбщая информация</h3>
          <div className='info-line'>
          </div>
          </div>
          <div className='input-wrapper'>
          <TextField fullWidth 
            helperText={name ?? 'Enter your name'}
            id="demo-helper-text-aligned"
            label="Имя"
            onChange={handleName} 
          />
          <TextField fullWidth
            style={{marginTop: '10px'}}
            helperText={surname ?? 'Enter your surname'}
            id="demo-helper-text-aligned"
            label="Фамилия"
            onChange={handleSurname} 
          />
          <TextField fullWidth
            style={{marginTop: '10px'}}
            helperText={backNumber ?? 'Enter your age'}
            id="demo-helper-text-aligned"
            label="Возврат"
            onChange={handleBackNumber} 
          />
          </div>

          <div className='like-wrapper'>
            <p className='like-paragraph'>Подписка</p>
            <Autocomplete
            fullWidth
            size='small'
              disablePortal
              id="combo-box-demo"
              sx={{
                  borderWidth: 0,
                  borderColor:'gray',
              }}
              options={option1}
              renderInput={(params) => <TextField {...params} label="Подписка на уведомпения" />}

              />
          </div>
         
       </section>
       {/* work and address */}
       <section className='work-address'>
          <div className='work'>
            <div className='flex'>
              <h3>Работа</h3>
              <div className='line-half'></div>
            </div>
              <TextField fullWidth id="outlined-basic" label="Должностъ" variant="outlined"
               onChange={handlePosition}
              />
              <TextField fullWidth
               style={{marginTop: '20px'}}
              id="outlined-basic" label="Место работы" variant="outlined"
              onChange={handleWorkAddress}
              />
          </div>
          <div className='address'>
          <div className='flex'>
              <h3 className='address-heading'>Домашний адрес</h3>
              <div className='line-half'></div>
            </div>
            <TextField fullWidth id="outlined-basic" label="Страна" variant="outlined" 
             onChange={handleCountry}
            />
              <TextField fullWidth
               style={{marginTop: '20px'}}
              id="outlined-basic" label="Город" variant="outlined" 
              onChange={handleCity}
              />
              <TextField fullWidth
               style={{marginTop: '20px'}}
              id="outlined-basic" label="Облостъ" variant="outlined"
              onChange={handleRegion}
              />
              <TextField fullWidth
               style={{marginTop: '20px'}}
              id="outlined-basic" label="Адрес" variant="outlined"
              onChange={handleAddress}
              />
          </div>
       </section>
    </div>

    </>
  );
};

export default TodoCardPage;
