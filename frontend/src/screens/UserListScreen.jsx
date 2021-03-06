import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoader from '../components/UIState/SpinnerLoader';
import { toast, ToastContainer } from 'react-toastify';
import { deleteUser, listUsers } from '../redux-slices/userReducer';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    users,
    deleteUserSuccess,
    message,
    userInfo,
  } = useSelector(state => state.users);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, deleteUserSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (deleteUserSuccess) {
      setTimeout(() => {
        toast.success(message);
      }, 2000);
    }
  }, [error, deleteUserSuccess, message]);

  if (loading) {
    return <SpinnerLoader />;
  }

  const deleteHandler = id => {
    if (id === userInfo._id) {
      toast.error("You can't delete your account!");
      return;
    }
    if (window.confirm('Are you sure you want to delete this User?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Table striped bordered hover responsive className='table-sm bg-light'>
        <thead className='text-center'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ color: 'lightgreen' }}>{user._id}</td>
              <td style={{ color: 'lightgreen' }}>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td className='text-center'>
                {user.isAdmin ? (
                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td className='text-center'>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteHandler(user._id)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </>
  );
};

export default UserListScreen;
