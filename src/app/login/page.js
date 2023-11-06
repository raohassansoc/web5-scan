"use client"
import { useState } from 'react'
import './style.css'

export default function Page() {

  return (
    <>
    <div className='devider'></div>
      <div className="container space-2">
        <form
          method="post"
          action="./login"
          id="form1"
          className="js-validate w-md-75 w-lg-50 mx-md-auto"
        >
          <div className="aspNetHidden">
            <input
              type="hidden"
              name="__VIEWSTATE"
              id="__VIEWSTATE"
              defaultValue="afHmwpU4cOYmoL5q7RShAt8iVh5J2Ik7IXxUD3m7jcqYlD/lr5lw6nYPMkgKKwMR4UJbu3syYALajTSLqP5I3d2x8jiJeIE76JNgN782LWaDuiHG0JIYgKaZJAjvR0dEkjgkGD6CK/qEnleMhcI4Q3L7CggjBHoz2LqVslUMAMooZawki4HMgEx00iIYL2XVJOu3cZTxF3iowUle/CdCkj/Xu4GeBZwy6Ke4kgEh3N53qdT1jV0usxx6/o6Oc0FyYoznAV+XIaPnf/XXWgjb9oNZSS3tXERlVlP/De6nBM3Ap7yc+cO1WScfWIo1ckI+vLMJyZ6BLzva0pVSDC2BtkW6lGOofiSB8KEEwiM6fb2R8ATgs+Jz4EbqqLF2T6HPzVgSEboy81aoG4MFq51PMg6+BjrMconDbYu9BFEQ4cQWmTQzxj+BpgD8m4bM9sDOHA05vi5sb/WT8cKVpzgeSaoEUO5OHwdj+DLex0SbkzFA843NahGefbu3VL7jbI1qSNr3re7zTlmwOUN2Q9VtUagLvLRkFYAhBuhRmzrYK0wjW6dMLDmj44pESt+tyWB18JwChjPt6jkNGlxz3BdAaZqYJqeDvqLMdpZbCLo3uwqBoWkc1xN5MxTVCsMCRFyCIRQ+M3/J7kLFhorrg6wZcpiHyWDqr2dF9Ne7bdMJjuF6t0aU75EQVrz8Sv1DKF4CLMER5057V//5MguLQu0RhZkGaB1vwZXGov/pjQ/XRD+NH2IHTDwjZ4vCfHw5QkSjGHehFzp4ZkhfCuujyynFY+iv7K6BKaqVuIXVar2CY2PuP7X9k6rdHEBfin4WAI59U9FLjxZe3Wai9nydakuzjrOpi5yq0FaYqloalnxpDgQIeCIi9l0BLK/75c4JAcAKy65yl9hYAYCDvAfu+MC27d+zJrM39kphnbu/UxTLwlNGYbCdZCdMBWjn7mo9NaKiE/6WhIkkXmgxDI1463gE35yNPAzoMwvD94aNlT5wueDF4isG58RD8B2xoB05POhQ6XXEvItz+Qb8DoFnPHcWOTT71xA36WTmZkeQHw+sznUfKKveOZunJhAOu63o6y5dwuvWWPcxT+AK+HcNPV75eu6WubZ5CazpOrSXDHevSy+YUsnWVLtqUJK+/KYhGkbinbwRZfgRXzZTfCAkuWVJDQnKWwoG0coy4qng/ZjVoGi6XagDf8rtgedlS9WXBm4BGFeL42q8LGS9QfZGm1MLl/+fpTBrYBEOwHV9UR4o81YIw+q3GqDXS5DBaSQVS7htHD6RCnZtzSQlPmC2UDbXWGzL6JaPYbPTgD4gRKi8YZ4Itm1BEQcA2tF90B8UqUFVFiXGcYkSn6EDjrsyFzsGIkx6iyxtnbkfXVGVY6NnURI="
            />
          </div>
          <div className="aspNetHidden">
            <input
              type="hidden"
              name="__VIEWSTATEGENERATOR"
              id="__VIEWSTATEGENERATOR"
              defaultValue="C2EE9ABB"
            />
            <input
              type="hidden"
              name="__EVENTVALIDATION"
              id="__EVENTVALIDATION"
              defaultValue="L2wGaTIjgZ5EppnLpUYDjj71J7yLfeeoHj5q7MqfDXLMF9ukWoqzGIqLrofJzYluQRSN/nNQ06r/H8sFfK2Tif3ba408N4mTePyaDtPT4wUWFlDTMa+pOODgKFfiTw2e6nvPavmvREfrCeUDghzRgCfdPOE+QiO1Rl5+NKs9rDlY6P31gt0WXEnDsmA9HfgL"
            />
          </div>
          <div className="mb-4">
            <h2 className="h3 text-[cornflowerblue] font-weight-normal mb-0">
              Welcome <span className="font-weight-semi-bold">back</span>
            </h2>
            <p>Login to your account</p>
          </div>
          <div className="js-form-message form-group">
            <label className="d-block" htmlFor="txtUserName">
              Username
            </label>
            <input
              name="ctl00$ContentPlaceHolder1$txtUserName"
              type="text"
              maxLength={50}
              id="ContentPlaceHolder1_txtUserName"
              tabIndex={1}
              className="form-control form-control-sm"
              required=""
              data-error-class="u-has-error"
              data-success-class="u-has-success"
              placeholder="Username"
              data-msg="Username is required."
            />
          </div>
          <div className="js-form-message form-group">
            <label className="d-block" htmlFor="txtPassword">
              <span className="d-flex justify-content-between align-items-center">
                Password
                <a
                  className="link-muted font-size-1"
                 
                  tabIndex={0}
                >
                  Forgot your password?
                </a>
              </span>
            </label>
            <input
              name="ctl00$ContentPlaceHolder1$txtPassword"
              type="password"
              maxLength={75}
              id="ContentPlaceHolder1_txtPassword"
              tabIndex={2}
              className="form-control form-control-sm"
              ria-label="********"
              required=""
              data-error-class="u-has-error"
              data-success-class="u-has-success"
              placeholder="Password"
              data-msg="Your password is invalid. Please try again."
            />
          </div>
          <div className="js-form-message">
            <div className="custom-control custom-checkbox d-flex align-items-center text-muted">
              <input
                name="ctl00$ContentPlaceHolder1$chkRemember"
                type="checkbox"
                id="ContentPlaceHolder1_chkRemember"
                className="custom-control-input"
              />
              <label
                className="custom-control-label"
                htmlFor="ContentPlaceHolder1_chkRemember"
                data-toggle="tooltip"
                data-placement="bottom"
                data-title="Please do not check this box if you are using a public or shared PC"
              >
                <span>Remember &amp; Auto Login</span>
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            <input name="g-recaptcha-response" style={{ visibility: "hidden" }} />
          </div>
          <div className="row align-items-center">
            <div className="col-5 col-sm-6">
              <span className="text-muted text-nowrap">Do not have an account?</span>
              <a  className="text-nowrap">
                Click to sign up
              </a>
            </div>
            <div className="col-7 col-sm-6 text-right">
              <input
                type="submit"
                name="ctl00$ContentPlaceHolder1$btnLogin"
                defaultValue="LOGIN"
                id="ContentPlaceHolder1_btnLogin"
                className="btn btn-sm btn-[cornflowerblue]"
              />
            </div>
          </div>
        </form>
      </div>

    </>
  )
}
