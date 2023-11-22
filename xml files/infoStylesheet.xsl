<?xml version="1.0" encoding="UTF-8"?>

<!--
    Document   : infoStylesheet.xsl
    Created on : 7 November 2023, 14:54
    Author     : domas
    Description:
        Purpose of transformation follows.
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html"/>

    <!-- TODO customize transformation rules 
         syntax recommendation http://www.w3.org/TR/xslt 
    -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Product Warehouse</title>
            </head>
            <body>
                
                <xsl:for-each select="//product">
                    
                    <div>
                        <xsl:attribute name="id">
                            <xsl:value-of select="@code" />
                        </xsl:attribute>
                        <xsl:attribute name="class">products</xsl:attribute>
                        
                        <info1><b>Code: </b><xsl:value-of select="@code" /></info1>
                        <br/>
                        <info2><b>Name: </b><xsl:value-of select="name" /></info2>
                        <br/>
                        
                        <moreInfo>
                            
                            <info3><b>Category: </b><xsl:value-of select="category" /></info3>
                            <br/>
                            <info4><b>Description: </b><xsl:value-of select="description" />
                            </info4>
                            <br/>
                            <info5><b>Quantity: </b><xsl:value-of select="quantity" /></info5>
                            <br/>
                            <info6><b>Unit Price: </b><xsl:value-of select="unitPrice" /></info6>
                            
                        </moreInfo>
                        
                    </div>
                    
                </xsl:for-each>
                
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
