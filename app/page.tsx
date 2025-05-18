import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, ClipboardList, MessageSquare, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // Dados simulados para o dashboard
  const stats = [
    { title: "Pacientes Hoje", value: "12", icon: Users, color: "bg-blue-100 text-blue-700" },
    { title: "Consultas Pendentes", value: "5", icon: Calendar, color: "bg-amber-100 text-amber-700" },
    { title: "Triagens Realizadas", value: "8", icon: ClipboardList, color: "bg-teal-100 text-teal-700" },
    { title: "Mensagens", value: "3", icon: MessageSquare, color: "bg-purple-100 text-purple-700" },
  ]

  const recentPatients = [
    { name: "Maria Silva", time: "09:30", status: "Em espera" },
    { name: "João Oliveira", time: "10:15", status: "Triagem" },
    { name: "Ana Santos", time: "11:00", status: "Consulta" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Hoje
          </Button>
          <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Pacientes</CardTitle>
            <CardDescription>Lista de pacientes agendados para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{patient.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {patient.time}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">{patient.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Ver todos os pacientes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
            <CardDescription>Atalhos para as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/triagem">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
                  <ClipboardList className="h-6 w-6 text-teal-600" />
                  <span>Nova Triagem</span>
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                  <span>Chat de Dúvidas</span>
                </Button>
              </Link>
              <Link href="/agenda">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-6 w-6 text-amber-600" />
                  <span>Agenda</span>
                </Button>
              </Link>
              <Link href="/perfil">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span>Perfis</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
