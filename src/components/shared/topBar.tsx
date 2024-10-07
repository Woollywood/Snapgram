import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignoutAccount } from '@/lib/reactQuery';
import { useAuth } from '@/context/auth';

export const TopBar: React.FC = () => {
	const navigate = useNavigate();
	const { mutate: signOut, isSuccess } = useSignoutAccount();
	const { user } = useAuth()!;

	useEffect(() => {
		if (isSuccess) {
			navigate(0);
		}
	}, [isSuccess]);

	return (
		<section className='topbar'>
			<div className='flex-between px-5 py-4'>
				<Link to='/' className='flex items-center gap-3'>
					<img src='/assets/images/logo.svg' alt='logo' width={130} height={325} />
				</Link>
				<div className='flex gap-4'>
					<Button variant='ghost' className='shad-button_ghost' onClick={() => signOut()}>
						<img src='/assets/icons/logout.svg' alt='logout' />
					</Button>
					<Link to={`/profile/${user?.$id}`} className='flex-center gap-3'>
						<img src={user?.imageUrl || ''} alt='profile' className='h-8 w-8 rounded-full' />
					</Link>
				</div>
			</div>
		</section>
	);
};
