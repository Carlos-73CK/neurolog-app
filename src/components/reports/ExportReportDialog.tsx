'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Mail } from 'lucide-react';
import { CheckedState } from '@radix-ui/react-checkbox';

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any[];
  metrics: any;
}

export function ExportReportDialog({ open, onOpenChange, data, metrics }: ExportReportDialogProps) {
  const [format, setFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [sendByEmail, setSendByEmail] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // TODO: Implementar lógica real de exportación
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular exportación
      
      console.log('Exportando reporte:', {
        format,
        includeCharts,
        includeRawData,
        sendByEmail,
        recordCount: data.length
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  // --- CORRECCIÓN: Función para manejar el cambio del Checkbox ---
  const handleCheckedChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (checked: CheckedState) => {
      // Convierte 'indeterminate' o false a false, y true a true.
      setter(!!checked); 
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Reporte</DialogTitle>
          <DialogDescription>
            Configura las opciones de exportación para tu reporte personalizado.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            {/* --- CORRECCIÓN SONAR: Asociar label con control --- */}
            <label htmlFor="export-format" className="text-sm font-medium text-gray-700 mb-2 block">
              Formato
            </label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="export-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF - Reporte visual</SelectItem>
                <SelectItem value="excel">Excel - Datos y gráficos</SelectItem>
                <SelectItem value="csv">CSV - Solo datos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* --- CORRECCIÓN SONAR: Usar fieldset y legend para agrupar controles --- */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-gray-700 block">
              Incluir en el reporte
            </legend>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="charts" 
                checked={includeCharts}
                onCheckedChange={handleCheckedChange(setIncludeCharts)}
              />
              <label htmlFor="charts" className="text-sm text-gray-700">
                Gráficos y visualizaciones
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rawdata" 
                checked={includeRawData}
                onCheckedChange={handleCheckedChange(setIncludeRawData)}
              />
              <label htmlFor="rawdata" className="text-sm text-gray-700">
                Datos detallados por registro
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="email" 
                checked={sendByEmail}
                onCheckedChange={handleCheckedChange(setSendByEmail)}
              />
              <label htmlFor="email" className="text-sm text-gray-700">
                Enviar por correo electrónico
              </label>
            </div>
          </fieldset>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              <strong>Resumen:</strong> {data.length} registros, {Object.keys(metrics).length} métricas
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              'Generando...'
            ) : (
              <>
                {sendByEmail ? <Mail className="h-4 w-4 mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                {sendByEmail ? 'Enviar Reporte' : 'Descargar Reporte'}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
