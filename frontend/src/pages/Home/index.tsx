import React, { useState } from 'react'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'

import {
  Form,
  HomeButton,
  HomeContainer,
  Footer,
  CreateAccount,
  Overlay
} from './styles'

import Logo from '../../assets/images/logoComTexto.png'
import OpenEye from '../../assets/images/eye-open.svg'
import CloseEye from '../../assets/images/eye-close.svg'
import LogoNT from '../../assets/images/logoSemTexto.png'
import Close from '../../assets/images/x.svg'
import { useAuth } from '../../contexts/authContext'
import { Buu, Ret } from '../../types'

const Home = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { loginBuser, registerBuser } = useAuth()

  const closeCreate = () => {
    setIsOpen(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const newUserForm = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      birthdate: '',
      teletelephone: '',
      terms: false,
      rets: [],
      description: '',
      buus_received: [] as Buu[],
      liked: [] as Ret[]
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'O nome precisa ter ao menos 5 caracteres')
        .required('O campo é obrigatório'),
      username: Yup.string()
        .min(5, 'O username precisa ter entre 5-20 caracteres')
        .max(20, 'O username precisa ter entre 5-20 caracteres')
        .required('As pessoas vão te achar por este username'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      password: Yup.string()
        .min(3, 'Sua senha precisa ter ao menos 3 caracteres')
        .max(10, 'Sua senha pode ter até 10 caracteres')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,10}$/,
          'A senha deve conter pelo menos uma letra e um número'
        )
        .required('A senha é obrigatória'),
      password2: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas são diferentes')
        .required('Você precisa confirmar sua senha'),
      birthdate: Yup.string()
        .required('A data de nascimento é obrigatória')
        .test('age', 'Você deve ter pelo menos 18 anos', (value) => {
          const [day, month, year] = value.split('/')
          const birthDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
          )
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            return age - 1 >= 18
          }
          return age >= 18
        }),

      teletelephone: Yup.string()
        .min(15, 'Isso não parece um número válido')
        .max(15, 'Isso não parece um número válido'),
      terms: Yup.boolean()
        .oneOf([true], 'Você deve concordar com os termos')
        .required('Você deve concordar com os termos')
    }),

    onSubmit: (values) => {
      registerBuser(
        values.name,
        values.username,
        values.email,
        values.teletelephone,
        values.password,
        values.birthdate,
        values.buus_received,
        values.description,
        values.liked
      )

      closeCreate()
    }
  })

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in newUserForm.touched
    const isInvalid = fieldName in newUserForm.errors

    const hasError = isTouched && isInvalid

    return hasError
  }

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      loginBuser(values.email, values.password)
    }
  })

  return (
    <>
      <HomeContainer>
        <img src={Logo} alt="Buuret" />
        <Form>
          <h2>
            Nos permita <span>descobrir</span> você <br />
            Se permita <span>ser</span> você.
          </h2>

          <form className="login" onSubmit={loginForm.handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
            />

            <div className="passwordInput">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                placeholder="Senha"
              />
              <button onClick={togglePasswordVisibility}>
                <img
                  src={showPassword ? CloseEye : OpenEye}
                  alt="Exibir ou ocultar senha"
                />
              </button>
            </div>

            <a href="#">Esqueci minha senha</a>

            <div className="loginButton">
              <HomeButton type="submit">Entrar</HomeButton>
            </div>
          </form>

          <div className="create">
            <h3>Ainda não tem uma conta?</h3>
            <HomeButton onClick={() => setIsOpen(true)}>Criar conta</HomeButton>
          </div>
        </Form>
      </HomeContainer>

      <Footer>
        <h4>O que voce quer compartilhar?</h4>
      </Footer>

      {isOpen && (
        <>
          <Overlay onClick={closeCreate} />
          <CreateAccount>
            <div className="Cardheader">
              <img src={LogoNT} alt="Buuret" />
            </div>

            <button className="CardX" onClick={closeCreate}>
              <img src={Close} alt="Fechar" />
            </button>

            <h2>Crie sua conta</h2>

            <form onSubmit={newUserForm.handleSubmit}>
              <div className="Division1">
                <div className="input-container name">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={checkInputHasError('name') ? 'error' : ''}
                    value={newUserForm.values.name}
                    onChange={newUserForm.handleChange}
                    onBlur={newUserForm.handleBlur}
                    placeholder="Nome"
                  />
                  {newUserForm.errors.name && newUserForm.touched.name && (
                    <div className="error-message">
                      {newUserForm.errors.name}
                    </div>
                  )}
                </div>
                <div className="input-container username">
                  <input
                    className={checkInputHasError('username') ? 'error' : ''}
                    value={newUserForm.values.username}
                    onChange={newUserForm.handleChange}
                    onBlur={newUserForm.handleBlur}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nome de usuário"
                  />
                  {newUserForm.errors.username &&
                    newUserForm.touched.username && (
                      <div className="error-message">
                        {newUserForm.errors.username}
                      </div>
                    )}
                </div>
              </div>
              <div className="input-container">
                <input
                  className={checkInputHasError('email') ? 'error' : ''}
                  value={newUserForm.values.email}
                  onChange={newUserForm.handleChange}
                  onBlur={newUserForm.handleBlur}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
                {newUserForm.errors.email && newUserForm.touched.email && (
                  <div className="error-message">
                    {newUserForm.errors.email}
                  </div>
                )}
              </div>
              <div className="Division2">
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={checkInputHasError('password') ? 'error' : ''}
                    value={newUserForm.values.password}
                    onChange={newUserForm.handleChange}
                    onBlur={newUserForm.handleBlur}
                    placeholder="Senha"
                  />
                  {newUserForm.errors.password &&
                    newUserForm.touched.password && (
                      <div className="error-message">
                        {newUserForm.errors.password}
                      </div>
                    )}
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    className={checkInputHasError('password2') ? 'error' : ''}
                    value={newUserForm.values.password2}
                    onChange={newUserForm.handleChange}
                    onBlur={newUserForm.handleBlur}
                    placeholder="Repetir senha"
                  />
                  {newUserForm.errors.password2 &&
                    newUserForm.touched.password2 && (
                      <div className="error-message">
                        {newUserForm.errors.password2}
                      </div>
                    )}
                </div>
              </div>
              <div className="Division2">
                <div className="input-container">
                  <InputMask
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    className={checkInputHasError('birthdate') ? 'error' : ''}
                    value={newUserForm.values.birthdate}
                    onChange={newUserForm.handleChange}
                    onBlur={newUserForm.handleBlur}
                    placeholder="Data de Nascimento"
                    mask="99/99/9999"
                  />
                  {newUserForm.errors.birthdate &&
                    newUserForm.touched.birthdate && (
                      <div className="error-message">
                        {newUserForm.errors.birthdate}
                      </div>
                    )}
                </div>
                <div className="input-container">
                  <InputMask
                    type="text"
                    name="teletelephone"
                    id="teletelephone"
                    className={
                      checkInputHasError('teletelephone') ? 'error' : ''
                    }
                    value={newUserForm.values.teletelephone}
                    onChange={newUserForm.handleChange}
                    onBlur={newUserForm.handleBlur}
                    placeholder="Telefone"
                    mask="(99) 99999-9999"
                  />
                  {newUserForm.errors.teletelephone &&
                    newUserForm.touched.teletelephone && (
                      <div className="error-message">
                        {newUserForm.errors.teletelephone}
                      </div>
                    )}
                </div>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className={checkInputHasError('terms') ? 'error' : ''}
                  value={newUserForm.values.terms ? 'true' : 'false'}
                  onChange={newUserForm.handleChange}
                  onBlur={newUserForm.handleBlur}
                />
                <span>
                  Li e concordo com os <a href="#">termos</a>
                </span>
                {newUserForm.errors.terms && newUserForm.touched.terms && (
                  <div className="error-message">
                    {newUserForm.errors.terms}
                  </div>
                )}
              </div>

              <div className="button">
                <HomeButton type="submit">Criar conta</HomeButton>
              </div>
            </form>
          </CreateAccount>
        </>
      )}
    </>
  )
}

export default Home
