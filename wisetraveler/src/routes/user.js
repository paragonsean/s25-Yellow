import {supabase} from './db';
import {Clerk} from '@clerk/clerk-sdk-node';

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY});

export const createUser = async (first_name, last_name, birth_date, userrole, email, username, password_hash) => {
    if (!first_name || !last_name || !birth_date || !userrole || !email || !username || !password_hash) {
        throw new Error("All fields are required");
    }

    try {
        // Use Clerk to create a user with email and password
        const user = await clerk.users.createUser({
            email_address: email,
            password_hash: password_hash,
            first_name,
            last_name,
            username
        });

        // Insert user data into the 'users' table in Supabase, including the extra fields
        const { data, error } = await supabase
            .from('users')
            .insert([{
                user_id: user.id, // Store Clerk's user ID
                account_no: generateAccountNumber(), // Call a function to generate account number
                first_name,
                last_name,
                birth_date,
                userrole,
                email,
                username,
                registration_date: new Date().toISOString(), // Store the registration date
            }]);

        if (error) throw error;

        return { message: 'Account created successfully', userId: data[0].user_id };
    } catch (err) {
        console.error("Error creating user:", err);
        throw new Error('Failed to create account');
    }
};

// Update an existing user account
export const updateUser = async (user_id, first_name, last_name, birth_date, userrole, email, username) => {
    if (!user_id || !first_name || !last_name || !birth_date || !userrole || !email || !username) {
        throw new Error("All fields are required");
    }

    try {
        // Update the user information in Supabase
        const { error } = await supabase
            .from('users')
            .update({
                first_name,
                last_name,
                birth_date,
                userrole,
                email,
                username
            })
            .eq('user_id', user_id);

        if (error) throw error;

        return { message: 'Account updated successfully' };
    } catch (err) {
        console.error("Error updating user:", err);
        throw new Error('Failed to update account');
    }
};

// Delete a user account
export const deleteUser = async (user_id) => {
    if (!user_id) {
        throw new Error("User ID is required");
    }

    try {
        // Delete the user from Supabase
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('user_id', user_id);

        if (error) throw error;

        return { message: 'Account deleted successfully' };
    } catch (err) {
        console.error("Error deleting user:", err);
        throw new Error('Failed to delete account');
    }
};


