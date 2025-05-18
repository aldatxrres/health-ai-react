"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, MapPin, Calendar, FileText, Shield, Edit, Save, X } from "lucide-react"

export default function PerfilPage() {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Perfil do Usuário</h1>
        <p className="text-gray-500 mt-1">Gerencie suas informações pessoais e preferências</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="personal">Pessoal</TabsTrigger>
          <TabsTrigger value="medical">Médico</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Seus dados pessoais e de contato</CardDescription>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => setEditMode(!editMode)}>
                    {editMode ? <X size={18} /> : <Edit size={18} />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <div className="flex items-center space-x-2">
                        <User size={18} className="text-gray-400" />
                        <Input
                          id="nome"
                          defaultValue="Dr. Carlos Silva"
                          readOnly={!editMode}
                          className={!editMode ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="especialidade">Especialidade</Label>
                      <div className="flex items-center space-x-2">
                        <FileText size={18} className="text-gray-400" />
                        <Select disabled={!editMode}>
                          <SelectTrigger className={!editMode ? "bg-gray-50" : ""}>
                            <SelectValue placeholder="Cardiologia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cardiologia">Cardiologia</SelectItem>
                            <SelectItem value="dermatologia">Dermatologia</SelectItem>
                            <SelectItem value="neurologia">Neurologia</SelectItem>
                            <SelectItem value="ortopedia">Ortopedia</SelectItem>
                            <SelectItem value="pediatria">Pediatria</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="flex items-center space-x-2">
                        <Mail size={18} className="text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          defaultValue="dr.carlos@mediassist.com"
                          readOnly={!editMode}
                          className={!editMode ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <div className="flex items-center space-x-2">
                        <Phone size={18} className="text-gray-400" />
                        <Input
                          id="telefone"
                          defaultValue="(11) 98765-4321"
                          readOnly={!editMode}
                          className={!editMode ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin size={18} className="text-gray-400" />
                      <Input
                        id="endereco"
                        defaultValue="Av. Paulista, 1000 - São Paulo, SP"
                        readOnly={!editMode}
                        className={!editMode ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Cardiologista com mais de 15 anos de experiência. Especialista em cardiologia intervencionista e doenças coronarianas."
                      readOnly={!editMode}
                      className={!editMode ? "bg-gray-50" : ""}
                      rows={4}
                    />
                  </div>

                  {editMode && (
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancelar
                      </Button>
                      <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setEditMode(false)}>
                        <Save size={18} className="mr-2" />
                        Salvar Alterações
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seu Perfil</CardTitle>
                  <CardDescription>Foto e informações de exibição</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Dr. Carlos Silva" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-lg">Dr. Carlos Silva</h3>
                  <p className="text-gray-500">Cardiologista</p>
                  <p className="text-sm text-gray-500 mt-1">CRM-SP 12345</p>

                  <div className="w-full mt-6">
                    <Button variant="outline" className="w-full">
                      Alterar Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Segunda-feira</span>
                      <span>08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Terça-feira</span>
                      <span>08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quarta-feira</span>
                      <span>08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quinta-feira</span>
                      <span>08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sexta-feira</span>
                      <span>08:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Sábado</span>
                      <span>Fechado</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Domingo</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Calendar size={16} className="mr-2" />
                    Editar Horários
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Informações Médicas</CardTitle>
              <CardDescription>Suas credenciais e especializações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="crm">CRM</Label>
                    <Input id="crm" defaultValue="CRM-SP 12345" readOnly className="bg-gray-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="especialidade-principal">Especialidade Principal</Label>
                    <Input id="especialidade-principal" defaultValue="Cardiologia" readOnly className="bg-gray-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formacao">Formação Acadêmica</Label>
                    <Textarea
                      id="formacao"
                      defaultValue="Medicina - Universidade de São Paulo (USP)
Residência em Cardiologia - Instituto do Coração (InCor)
Doutorado em Cardiologia - USP"
                      readOnly
                      className="bg-gray-50"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="especializacoes">Especializações</Label>
                    <Textarea
                      id="especializacoes"
                      defaultValue="Cardiologia Intervencionista
Ecocardiografia
Eletrofisiologia Cardíaca"
                      readOnly
                      className="bg-gray-50"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idiomas">Idiomas</Label>
                    <Textarea
                      id="idiomas"
                      defaultValue="Português (Nativo)
Inglês (Fluente)
Espanhol (Intermediário)"
                      readOnly
                      className="bg-gray-50"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Edit size={18} className="mr-2" />
                  Editar Informações Médicas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>Atualize sua senha de acesso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-2">Atualizar Senha</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>Configure opções de segurança adicionais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                      <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Dispositivos Conectados</h4>
                      <p className="text-sm text-gray-500">Gerencie dispositivos com acesso à sua conta</p>
                    </div>
                    <Button variant="outline">Visualizar</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Histórico de Atividades</h4>
                      <p className="text-sm text-gray-500">Veja o histórico de login e ações</p>
                    </div>
                    <Button variant="outline">Visualizar</Button>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-start space-x-2 text-sm">
                    <Shield size={16} className="text-teal-600 mt-0.5" />
                    <p className="text-gray-500">
                      Sua segurança é importante para nós. Recomendamos usar senhas fortes e ativar a autenticação de
                      dois fatores.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
