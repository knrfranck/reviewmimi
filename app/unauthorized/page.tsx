export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Access denied</h1>
        <p className="mt-4 text-slate-600">
          You do not have permission to view this page. If you think this is a mistake, please sign in with a different account or contact support.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to home
          </a>
          <a
            href="/login"
            className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}
