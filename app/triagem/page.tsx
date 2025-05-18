import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TriagemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Triagem de Pacientes</h1>
        <p className="text-gray-500 mt-1">Preencha o formulário para realizar a triagem inicial do paciente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Paciente</CardTitle>
              <CardDescription>Dados pessoais e de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Nome completo do paciente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                  <Input id="data-nascimento" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Endereço completo" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sinais Vitais</CardTitle>
              <CardDescription>Registro dos sinais vitais do paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperatura">Temperatura (°C)</Label>
                  <Input id="temperatura" type="number" step="0.1" placeholder="36.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pressao">Pressão Arterial (mmHg)</Label>
                  <Input id="pressao" placeholder="120/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequencia-cardiaca">Freq. Cardíaca (bpm)</Label>
                  <Input id="frequencia-cardiaca" type="number" placeholder="80" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequencia-respiratoria">Freq. Respiratória</Label>
                  <Input id="frequencia-respiratoria" type="number" placeholder="16" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saturacao">Saturação O₂ (%)</Label>
                  <Input id="saturacao" type="number" placeholder="98" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glicemia">Glicemia (mg/dL)</Label>
                  <Input id="glicemia" type="number" placeholder="100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Queixa e Histórico</CardTitle>
              <CardDescription>Informações sobre a queixa principal e histórico médico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="queixa">Queixa Principal</Label>
                <Textarea id="queixa" placeholder="Descreva a queixa principal do paciente" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inicio">Início dos Sintomas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tempo de início" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="ontem">Ontem</SelectItem>
                    <SelectItem value="2-3dias">2-3 dias</SelectItem>
                    <SelectItem value="semana">Uma semana</SelectItem>
                    <SelectItem value="mes">Um mês ou mais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Intensidade da Dor (se aplicável)</Label>
                <RadioGroup defaultValue="0" className="flex space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem value={value.toString()} id={`dor-${value}`} className="sr-only" />
                      <Label
                        htmlFor={`dor-${value}`}
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border border-gray-200 hover:bg-gray-100 peer-checked:bg-teal-100 peer-checked:border-teal-500 peer-checked:text-teal-700"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sem dor</span>
                  <span>Dor máxima</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Histórico Médico</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {["Hipertensão", "Diabetes", "Asma", "Cardiopatia", "Câncer", "AVC", "Epilepsia", "Alergias"].map(
                    (condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={`condition-${condition}`} />
                        <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                <Textarea id="medicamentos" placeholder="Liste os medicamentos que o paciente utiliza" rows={2} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Classificação de Risco</CardTitle>
              <CardDescription>Selecione o nível de prioridade</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="amarelo" className="space-y-3">
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 border border-red-100">
                  <RadioGroupItem value="vermelho" id="vermelho" />
                  <Label htmlFor="vermelho" className="font-medium text-red-700">
                    Emergência (Vermelho)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <RadioGroupItem value="laranja" id="laranja" />
                  <Label htmlFor="laranja" className="font-medium text-amber-700">
                    Muito Urgente (Laranja)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                  <RadioGroupItem value="amarelo" id="amarelo" />
                  <Label htmlFor="amarelo" className="font-medium text-yellow-700">
                    Urgente (Amarelo)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 border border-green-100">
                  <RadioGroupItem value="verde" id="verde" />
                  <Label htmlFor="verde" className="font-medium text-green-700">
                    Pouco Urgente (Verde)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <RadioGroupItem value="azul" id="azul" />
                  <Label htmlFor="azul" className="font-medium text-blue-700">
                    Não Urgente (Azul)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
              <CardDescription>Informações adicionais relevantes</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Adicione observações importantes sobre o paciente" rows={5} />
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Salvar Triagem</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
