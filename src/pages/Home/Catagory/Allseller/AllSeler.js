import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSeler = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://headphone-relast-server.vercel.app/users')
            const data = await res.json();
            return data;


        }
    })
    const handleDeleteUser = user => {
        fetch(`https://headphone-relast-server.vercel.app/sellers/${user._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
                toast.success(` ${user.name} deleted successfully`)

            })
    }
    return (
        <div>
            <h2 className="text-3xl">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => user.role === 'Buyer' &&
                                <>
                                    <tr key={user._id}>
                                        <th>{i + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            {user?.role !== 'admin' ? <button onClick={() => handleDeleteUser(user)} className='btn btn-xs btn-denger'>Dlete</button>
                                                :
                                                <button disabled className='btn btn-xs btn-denger'>Dlete</button>
                                            }
                                        </td>
                                    </tr>
                                </>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeler;