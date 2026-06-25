import { onRequest as __api_auth_backup_codes_verify_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\backup-codes\\verify.ts"
import { onRequest as __api_auth_reset_password_confirm_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\reset-password\\confirm.ts"
import { onRequest as __api_auth_sessions_delete_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\sessions\\delete.ts"
import { onRequest as __api_auth_totp_enroll_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\totp\\enroll.ts"
import { onRequest as __api_auth_totp_verify_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\totp\\verify.ts"
import { onRequest as __api_auth_backup_codes_index_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\backup-codes\\index.ts"
import { onRequest as __api_auth_bootstrap_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\bootstrap.ts"
import { onRequest as __api_auth_email_otp_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\email-otp.ts"
import { onRequest as __api_auth_reset_password_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\reset-password.ts"
import { onRequest as __api_auth_sign_in_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\sign-in.ts"
import { onRequest as __api_auth_sign_up_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\auth\\sign-up.ts"
import { onRequest as __api_cms_build_status_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\cms\\build-status.ts"
import { onRequest as __api_cms_discard_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\cms\\discard.ts"
import { onRequest as __api_cms_publish_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\cms\\publish.ts"
import { onRequest as __api_cleanup_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\cleanup.ts"
import { onRequest as __api_contact_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\api\\contact.ts"
import { onRequest as __admin__middleware_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\admin\\_middleware.ts"
import { onRequest as __auth_index_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\auth\\index.ts"
import { onRequest as __preview__middleware_ts_onRequest } from "C:\\Workspace\\templates\\astro-sveltia-cloudflare\\functions\\preview\\_middleware.ts"

export const routes = [
    {
      routePath: "/api/auth/backup-codes/verify",
      mountPath: "/api/auth/backup-codes",
      method: "",
      middlewares: [],
      modules: [__api_auth_backup_codes_verify_ts_onRequest],
    },
  {
      routePath: "/api/auth/reset-password/confirm",
      mountPath: "/api/auth/reset-password",
      method: "",
      middlewares: [],
      modules: [__api_auth_reset_password_confirm_ts_onRequest],
    },
  {
      routePath: "/api/auth/sessions/delete",
      mountPath: "/api/auth/sessions",
      method: "",
      middlewares: [],
      modules: [__api_auth_sessions_delete_ts_onRequest],
    },
  {
      routePath: "/api/auth/totp/enroll",
      mountPath: "/api/auth/totp",
      method: "",
      middlewares: [],
      modules: [__api_auth_totp_enroll_ts_onRequest],
    },
  {
      routePath: "/api/auth/totp/verify",
      mountPath: "/api/auth/totp",
      method: "",
      middlewares: [],
      modules: [__api_auth_totp_verify_ts_onRequest],
    },
  {
      routePath: "/api/auth/backup-codes",
      mountPath: "/api/auth/backup-codes",
      method: "",
      middlewares: [],
      modules: [__api_auth_backup_codes_index_ts_onRequest],
    },
  {
      routePath: "/api/auth/bootstrap",
      mountPath: "/api/auth",
      method: "",
      middlewares: [],
      modules: [__api_auth_bootstrap_ts_onRequest],
    },
  {
      routePath: "/api/auth/email-otp",
      mountPath: "/api/auth",
      method: "",
      middlewares: [],
      modules: [__api_auth_email_otp_ts_onRequest],
    },
  {
      routePath: "/api/auth/reset-password",
      mountPath: "/api/auth",
      method: "",
      middlewares: [],
      modules: [__api_auth_reset_password_ts_onRequest],
    },
  {
      routePath: "/api/auth/sign-in",
      mountPath: "/api/auth",
      method: "",
      middlewares: [],
      modules: [__api_auth_sign_in_ts_onRequest],
    },
  {
      routePath: "/api/auth/sign-up",
      mountPath: "/api/auth",
      method: "",
      middlewares: [],
      modules: [__api_auth_sign_up_ts_onRequest],
    },
  {
      routePath: "/api/cms/build-status",
      mountPath: "/api/cms",
      method: "",
      middlewares: [],
      modules: [__api_cms_build_status_ts_onRequest],
    },
  {
      routePath: "/api/cms/discard",
      mountPath: "/api/cms",
      method: "",
      middlewares: [],
      modules: [__api_cms_discard_ts_onRequest],
    },
  {
      routePath: "/api/cms/publish",
      mountPath: "/api/cms",
      method: "",
      middlewares: [],
      modules: [__api_cms_publish_ts_onRequest],
    },
  {
      routePath: "/api/cleanup",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_cleanup_ts_onRequest],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_contact_ts_onRequest],
    },
  {
      routePath: "/admin",
      mountPath: "/admin",
      method: "",
      middlewares: [__admin__middleware_ts_onRequest],
      modules: [],
    },
  {
      routePath: "/auth",
      mountPath: "/auth",
      method: "",
      middlewares: [],
      modules: [__auth_index_ts_onRequest],
    },
  {
      routePath: "/preview",
      mountPath: "/preview",
      method: "",
      middlewares: [__preview__middleware_ts_onRequest],
      modules: [],
    },
  ]