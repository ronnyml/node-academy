import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import prisma from '../config/db';

export const registerUser = async (email: string, password: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'Email already registered',
      };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        roleId: 3, // Default role: Student
      },
      include: {
        role: true,
      },
    });

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role?.name || 'Student',
        },
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'An error occurred during registration',
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid password',
      };
    }

    if (!user.role) {
      return {
        success: false,
        message: 'User role not found',
      };
    }

    const token = signToken({ userId: user.id, role: user.role.name });

    return {
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.name,
        },
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login',
    };
  }
};
