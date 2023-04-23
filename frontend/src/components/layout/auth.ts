// // const token = localStorage.getItem('token');
// // const username = localStorage.getItem('username');
// const [token, setToken] = useState(localStorage.getItem('token'));
// const [username, setUsername] = useState(localStorage.getItem('username'));
// const [users, setUsers] = useState<IUser[]>([]);

// const auth = async () => {
//   try {
//     const client = new AccountClient(undefined, 'https://ia-ssnticom-tst.rnd.local');
//     const response = await client.jWTAuthorize(undefined, undefined, {
//       userName: 'system',
//       password: '1qaz@WSX'
//     });
//     const token = response.data.access_token;
//     const username = response.data.username;

//     username && localStorage.setItem('username', username);
//     username && setUsername(username);

//     token && localStorage.setItem('token', token);
//     token && setToken(token);
//   } catch (error) {

//   }
// };

// const getUsers = async () => {
//   try {
//     const client = new UsersClient({
//       apiKey: 'Bearer ' + token
//     } as Configuration, 'https://ia-ssnticom-tst.rnd.local');
//     const response = await client.search();
//     setUsers(response.data);
//   } catch (error) {

//   }
// };

// useEffect(() => {
//   if (!token) auth();
// }, []);

// useEffect(() => {
//   token && getUsers();
// }, [token]);
