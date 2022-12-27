import React from 'react';

const AvailableUsers = ({user, selectUser}) => {

    let userss=[{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    },{
        username:'lorem',email: 'ipsum',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/test-1bf11.appspot.com/o/avatars%2FLYF7y4VtegNdGTK4L4F35f46XOu1%2F1651325717471-1551512926_36.jpg?alt=media&token=fc624733-11ad-478e-b3be-972e84c45c27',
        isOnline:Boolean(Math.round(Math.random()))
    }];
    return (
        <>
            <button className="users-list-wrapper"  onClick={()=>{selectUser(user)}}>

                <div  style={{ display: 'flex'}}>
                    <div style={{position:'relative'}} >
                        <img src={user.photoUrl}
                              alt='' style={{ width:"40px", height:"40px", borderRadius:50}}/>
                        <div>{user.isOnline ?
                            <p className="chat-online"></p>
                            :null}
                        </div></div>
                        <div className="users-list-content">
                            <div className="">{user.username}

                        </div>


                    </div>


                </div>

            </button>

        </>
    );
};

export default AvailableUsers;