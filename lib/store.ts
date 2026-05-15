import { create } from 'zustand'
import { Report, User } from './supabase'

interface ReportStore {
  reports: Report[]
  selectedReport: Report | null
  setReports: (reports: Report[]) => void
  setSelectedReport: (report: Report | null) => void
  addReport: (report: Report) => void
}

interface UserStore {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  selectedReport: null,
  setReports: (reports) => set({ reports }),
  setSelectedReport: (report) => set({ selectedReport: report }),
  addReport: (report) => set((state) => ({ reports: [...state.reports, report] })),
}))

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: user !== null }),
  logout: () => set({ user: null, isLoggedIn: false }),
}))
