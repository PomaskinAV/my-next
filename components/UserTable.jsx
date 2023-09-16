import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    address: { city: '' },
    phone: '',
    website: '',
    company: { name: '' },
  });
  
  useEffect(() => {
    setNewUser({
      name: '',
      email: '',
      address: { city: '' },
      phone: '',
      website: '',
      company: { name: '' },
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setNewUser({
        ...newUser,
        [parentKey]: {
          ...newUser[parentKey],
          [childKey]: value,
        },
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value,
      });
    }
  };
  
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.address.city && newUser.phone && newUser.website && newUser.company.name) {
      setUsers([...users, newUser]);
      setNewUser({
        name: '',
        email: '',
        address: { city: '' },
        phone: '',
        website: '',
        company: { name: '' },
      });
    } else {
      alert('Заполните все поля перед добавлением пользователя.');
    }
  };
  
  const sortUsers = (columnName) => {
    const sortedUsers = [...users];
  
    sortedUsers.sort((a, b) => {
      const valueA = a[columnName];
      const valueB = b[columnName];
  
      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
      }
  
      return valueA - valueB;
    });
  
    if (sortDirection === 'desc') {
      sortedUsers.reverse();
    }
  
    return sortedUsers;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const sortedUsers = sortUsers(sortColumn);
  
  return (
    <div>
      <h1>Таблица пользователей</h1>
      <table>
        <thead>
          <tr>
          <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('address.city')}>City</th>
            <th onClick={() => handleSort('phone')}>Phone</th>
            <th onClick={() => handleSort('website')}>Website</th>
            <th onClick={() => handleSort('company.name')}>Company</th>
            <th>Action</th> {}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {typeof window !== 'undefined' && (
      <tfoot>
      <tr>
        <td>
          <input
            type="text"
            placeholder="Имя"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Город"
            name="address.city"
            value={newUser.address.city}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Телефон"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Вебсайт"
            name="website"
            value={newUser.website}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Название компании"
            name="company.name"
            value={newUser.company.name}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <button onClick={handleAddUser}>Добавить</button>
        </td>
      </tr>
    </tfoot>
)}
    </div>
  );
};

export default UserTable;